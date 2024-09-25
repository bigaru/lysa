import rxjs from 'rxjs'

export class List<T> {
    #value: Array<T>
    #fns: rxjs.OperatorFunction<any, any>[] = []

    constructor(value: Array<T>) {
        this.#value = value
    }

    forEach = (callback: (item: T) => void): void => {
        new rxjs.Observable((s) => {
            this.#value.forEach((i) => s.next(i))
        })
            .pipe(...(this.#fns as []))
            .forEach(callback)
    }

    toArray(): T[] {
        //const arr = []
        let res

        new rxjs.Observable((s) => {
            this.#value.forEach((i) => s.next(i))
            s.complete()
        })
            .pipe(...(this.#fns as []), rxjs.toArray())
            .subscribe((item) => (res = item))

        return res
    }

    toArray2(): T[] {
        const arr = []

        new rxjs.Observable((s) => {
            for (let i = 0, n = this.#value.length; i < n; i++) {
                s.next(this.#value[i])
            }
            s.complete()
        })
            .pipe(...(this.#fns as []))
            .subscribe((item) => arr.push(item))

        return arr
    }

    filter(filterFn: (item: T, idx: number) => boolean): List<T> {
        this.#fns.push(rxjs.filter(filterFn))
        return this
    }

    map<B>(mapFn: (item: T) => B): List<B> {
        this.#fns.push(rxjs.map(mapFn))
        return this as any
    }
}

export const filter = rxjs.filter
export const map = rxjs.map

type Creator<T> = (stream: ArrayStream<T>) => any

export function ArrayCreator<T>(stream: ArrayStream<T>) {
    const arr = []

    new rxjs.Observable((s) => {
        for (let i = 0, len = stream.value.length; i < len; i++) {
            s.next(stream.value[i])
        }
        s.complete()
    })
        .pipe(...(stream.ops as []))
        .subscribe((item) => arr.push(item))

    return arr
}

export abstract class Base<A> {
    abstract value: A
    abstract ops: rxjs.OperatorFunction<any, any>[]
}

export class ArrayStream<A> {
    readonly value: Array<A>
    readonly ops: rxjs.OperatorFunction<A, any>[]

    constructor(value: Array<A>, ops: any[]) {
        this.value = value
        this.ops = ops
    }

    //pipe<B>(op: rxjs.OperatorFunction<A, B>)
    pipe<C extends any[]>(...newOps: rxjs.OperatorFunction<A, [...C]>[]) {
        //pipe<B, C extends any[]>(op: rxjs.OperatorFunction<A, B>, ...newOps: rxjs.OperatorFunction<B, [...C]>[])
        let a = new ArrayStream<C>(this.value as any, this.ops.concat(newOps))
        return a
    }

    as(creator: Creator<A>) {
        return creator(this)
    }
}
