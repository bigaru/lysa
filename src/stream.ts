export abstract class Stream<A> {
    protected parent: Stream<A>

    abstract each(callback: (item: A) => void): void
    forEach(callback: (item: A) => void): void {
        this.each(callback)
    }

    filter(filterFn: (element: A) => boolean) {
        return new FilterStream<A>(this, filterFn)
    }

    map<B>(mapFn: (element: A) => B) {
        return new MapStream<B>(this, mapFn)
    }

    toArray(): A[] {
        let result: A[] = []

        this.each((item) => {
            result.push(item)
        })

        return result
    }
}

export class BaseStream<T> extends Stream<T> {
    protected parent = null
    value: T[]

    constructor(value: T[]) {
        super()
        this.value = value
    }

    each(callback: (item: T) => void): void {
        for (let i = 0; i < this.value.length; i++) {
            callback(this.value[i])
        }
    }
}

class FilterStream<T> extends Stream<T> {
    #filterFn

    constructor(parent, filterFn) {
        super()
        this.parent = parent
        this.#filterFn = filterFn
    }

    each(callback: (item: T) => void) {
        this.parent.each((item) => {
            if (this.#filterFn(item)) {
                callback(item)
            }
        })
    }
}

class MapStream<T> extends Stream<T> {
    #mapFn

    constructor(parent, filterFn) {
        super()
        this.parent = parent
        this.#mapFn = filterFn
    }

    each(callback: (item: T) => void) {
        this.parent.each((item) => {
            callback(this.#mapFn(item))
        })
    }
}
