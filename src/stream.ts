import { of, type OperatorFunction } from 'rxjs'

type OF<A = any, B = any> = OperatorFunction<A, B>
type Creator<A, B> = (stream: ArrayStream<A>) => B

export class ArrayStream<ELEM> {
    readonly value: ReadonlyArray<ELEM>
    readonly ops: ReadonlyArray<OF>

    constructor(value: ReadonlyArray<ELEM>, ops: ReadonlyArray<OF> = []) {
        this.value = value
        this.ops = ops
    }

    perform(): ArrayStream<any>
    perform<A>(...newOps: [OF<ELEM, A>]): ArrayStream<A>
    perform<A, B>(...newOps: [OF<ELEM, A>, OF<A, B>]): ArrayStream<B>
    perform<A, B, C>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>]): ArrayStream<C>
    perform<A, B, C, D>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>]): ArrayStream<D>
    perform<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>]): ArrayStream<E>
    perform<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>, ...OF[]]): ArrayStream<any>
    perform(...newOps: OF[]) {
        return new ArrayStream(this.value, this.ops.concat(newOps))
    }

    complete<RESULT>(creator: Creator<ELEM, RESULT>) {
        return creator(this)
    }
}

export function asArray<T>() {
    return (stream: ArrayStream<T>) => {
        const arr: Array<T> = new Array()

        of(...stream.value)
            .pipe(...(stream.ops as []))
            .subscribe((item: any) => arr.push(item))

        return arr
    }
}

export function forEach<T>(fn: (item: T) => any) {
    return (stream: ArrayStream<T>) => {
        of(...stream.value)
            .pipe(...(stream.ops as []))
            .subscribe((item: any) => fn(item))
    }
}
