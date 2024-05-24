export class Stream<A> {
    value: Iterable<A>
    iteratorCreators: Array<(it: Iterator<any>) => Iterator<any>> = []

    constructor(value: Iterable<A>) {
        this.value = value
    }

    [Symbol.iterator](): Iterator<A> {
        const lastIterator = this.iteratorCreators.reduce((parent, creator) => creator(parent), new BaseIterator(this) as Iterator<any>)
        return lastIterator
    }

    forEach = (callback: (item: A) => void): void => {
        for (const item of this) {
            callback(item)
        }
    }

    chunk(size: number): Stream<A[]> {
        if (size <= 0) {
            throw new Error('size must be positive')
        }

        const creator = (parent) => new ChunkIterator(parent, size)
        this.iteratorCreators.push(creator)
        return this as any
    }

    filter(filterFn: (item: A) => boolean): Stream<A> {
        const creator = (parent) => new FilterIterator(parent, filterFn)
        this.iteratorCreators.push(creator)
        return this
    }

    map<B>(mapFn: (item: A) => B): Stream<B> {
        const creator = (parent) => new MapIterator(parent, mapFn)
        this.iteratorCreators.push(creator)
        return this as any
    }

    toArray(): A[] {
        return [...this]
    }
}

class BaseIterator<T> implements Iterator<T> {
    #iterator: Iterator<T>

    constructor(stream: Stream<T>) {
        this.#iterator = stream.value[Symbol.iterator]()
    }

    next(): IteratorResult<T, T | undefined> {
        return this.#iterator.next()
    }
}

class ChunkIterator<A> implements Iterator<A[]> {
    #parent: Iterator<A>
    #size: number

    constructor(parent: Iterator<A>, size: number) {
        this.#parent = parent
        this.#size = size
    }

    next(): IteratorResult<A[]> {
        const chunk: A[] = []
        let current = this.#parent.next()

        while (!current.done) {
            chunk.push(current.value)

            if (chunk.length === this.#size) {
                return { done: false, value: chunk }
            }

            current = this.#parent.next()
        }

        return { done: chunk.length === 0, value: chunk }
    }
}

class FilterIterator<T> implements Iterator<T> {
    #parent: Iterator<T>
    #filterFn: (item: T) => boolean

    constructor(parent: Iterator<T>, filterFn: (item: T) => boolean) {
        this.#parent = parent
        this.#filterFn = filterFn
    }

    next(): IteratorResult<T> {
        let current = this.#parent.next()

        while (!current.done) {
            if (this.#filterFn(current.value)) {
                return current
            }

            current = this.#parent.next()
        }

        return current
    }
}

class MapIterator<A, B> implements Iterator<B> {
    #parent: Iterator<A>
    #mapFn: (item: A) => B

    constructor(parent: Iterator<A>, mapFn: (item: A) => B) {
        this.#parent = parent
        this.#mapFn = mapFn
    }

    next(): IteratorResult<B> {
        const { done, value } = this.#parent.next()
        return { done, value: this.#mapFn(value) }
    }
}
