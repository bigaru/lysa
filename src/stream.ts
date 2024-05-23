export abstract class Stream<A, C = A> {
    protected parent: Stream<C>;

    abstract [Symbol.iterator](): Iterator<A>

    forEach = (callback: (item: A) => void): void => {
        for (const item of this) {
            callback(item)
        }
    }
    each = this.forEach

    filter(filterFn: (element: A) => boolean): Stream<A> {
        return new FilterStream<A>(this, filterFn)
    }

    map<B>(mapFn: (element: A) => B): Stream<B, A> {
        return new MapStream<A, B>(this, mapFn)
    }

    toArray(): A[] {
        return [...this]
    }
}

export class BaseStream<T> extends Stream<T> {
    protected parent = null
    value: Iterable<T>

    constructor(value: Iterable<T>) {
        super()
        this.value = value
    }

    [Symbol.iterator](): Iterator<T> {
        return new BaseIterator(this)
    }
}

class BaseIterator<T> implements Iterator<T> {
    #iterator: Iterator<T>

    constructor(stream: BaseStream<T>) {
        this.#iterator = stream.value[Symbol.iterator]()
    }

    next(): IteratorResult<T, T | undefined> {
        return this.#iterator.next()
    }
}

class FilterStream<T> extends Stream<T> {
    #filterFn: (item: T) => boolean

    constructor(parent: Stream<T>, filterFn: (item: T) => boolean) {
        super()
        this.parent = parent
        this.#filterFn = filterFn
    }

    [Symbol.iterator](): Iterator<T> {
        return new FilterIterator(this.parent, this.#filterFn)
    }
}

class FilterIterator<T> implements Iterator<T> {
    #parent: Iterator<T>
    #filterFn: (item: T) => boolean

    constructor(parent: Stream<T>, filterFn: (item: T) => boolean) {
        this.#parent = parent[Symbol.iterator]()
        this.#filterFn = filterFn
    }

    next(): IteratorResult<T, T | undefined> {
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

class MapStream<A, B> extends Stream<B, A> {
    #mapFn: (item: A) => B

    constructor(parent: Stream<A>, mapFn: (item: A) => B) {
        super()
        this.parent = parent
        this.#mapFn = mapFn
    }

    [Symbol.iterator](): Iterator<B> {
        return new MapIterator(this.parent, this.#mapFn)
    }
}

class MapIterator<A, B> implements Iterator<B> {
    #parent: Iterator<A>
    #mapFn: (item: A) => B

    constructor(parent: Stream<A>, mapFn) {
        this.#parent = parent[Symbol.iterator]()
        this.#mapFn = mapFn
    }

    next(): IteratorResult<B, B | undefined> {
        const { done, value } = this.#parent.next()
        return { done, value: this.#mapFn(value) }
    }
}
