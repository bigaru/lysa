import { Observable, type OperatorFunction } from 'rxjs'

type OF<A = any, B = any> = OperatorFunction<A, B>
type CompletionOperator<A, B> = (stream: Stream<A>) => B

type ObservableCreator<T> = () => Observable<T>

export class Stream<ELEM> {
    readonly createObservable: ObservableCreator<ELEM>
    readonly ops: ReadonlyArray<OF>

    constructor(creator: ObservableCreator<ELEM>, ops: ReadonlyArray<OF> = []) {
        this.createObservable = creator
        this.ops = ops
    }

    perform(): Stream<any>
    perform<A>(...newOps: [OF<ELEM, A>]): Stream<A>
    perform<A, B>(...newOps: [OF<ELEM, A>, OF<A, B>]): Stream<B>
    perform<A, B, C>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>]): Stream<C>
    perform<A, B, C, D>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>]): Stream<D>
    perform<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>]): Stream<E>
    perform<A, B, C, D, E>(...newOps: [OF<ELEM, A>, OF<A, B>, OF<B, C>, OF<C, D>, OF<D, E>, ...OF[]]): Stream<any>
    perform(...newOps: OF[]) {
        return new Stream(this.createObservable, this.ops.concat(newOps))
    }

    complete<RESULT>(creator: CompletionOperator<ELEM, RESULT>) {
        return creator(this)
    }
}
