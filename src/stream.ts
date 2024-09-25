import { Observable, OperatorFunction, filter, map } from 'rxjs'

export { filter, map }

type OF<A = any, B = any> = OperatorFunction<A, B>

type Creator<T> = (stream: ArrayStream<T>) => any

export function ArrayCreator<T>(stream: ArrayStream<T>) {
    const len = stream.value.length
    const arr = new Array()

    new Observable((s) => {
        for (let i = 0; i < len; i++) {
            s.next(stream.value[i])
        }
        s.complete()
    })
        .pipe(...(stream.ops as []))
        .subscribe((item) => arr.push(item))

    return arr
}

export class ArrayStream<ELEM> {
    readonly value: ReadonlyArray<ELEM>
    readonly ops: OF[]

    constructor(value: ReadonlyArray<ELEM>, ops: OF[]) {
        this.value = value
        this.ops = ops
    }

    pipe(): ArrayStream<any>
    pipe<A>(...newOps: [OF<ELEM, A>]): ArrayStream<any>
    pipe<A, B>(...newOps: [OF<ELEM, A>, OF<A, B>]): ArrayStream<any>
    pipe<A, B, C>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>]): ArrayStream<any>
    pipe<A, B, C, D>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>]): ArrayStream<any>
    pipe<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>]): ArrayStream<any>
    pipe<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>, ...OF[]]): ArrayStream<any>
    pipe(...newOps: OF[]) {
        return new ArrayStream(this.value, this.ops.concat(newOps))
    }

    as(creator: Creator<ELEM>) {
        return creator(this)
    }
}
