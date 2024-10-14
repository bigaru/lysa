import { ReplaySubject, type Observable, type OperatorFunction } from 'rxjs'
import { asArray } from '.'

type OF<A = any, B = any> = OperatorFunction<A, B>
export type TerminalOperator<A, B> = (ob: Observable<A>) => B

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

    complete<RESULT = ELEM>(): CompletedStream<RESULT>
    complete<RESULT>(operator: TerminalOperator<ELEM, RESULT>): RESULT
    complete<RESULT>(operator?: TerminalOperator<ELEM, RESULT>): any {
        const observable = this.createObservable().pipe(...(this.ops as []))

        if (operator) {
            return operator(observable)
        }

        return new CompletedStream(observable)
    }
}

export class CompletedStream<T> {
    readonly subject = new ReplaySubject<T>()

    constructor(observable: Observable<T>) {
        observable.subscribe(this.subject)
    }

    get<S>(operator: TerminalOperator<T, S>) {
        return operator(this.subject)
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0
        const internalArray = this.get(asArray())
        const len = internalArray.length

        return {
            next() {
                if (index < len) {
                    return { value: internalArray[index++], done: false }
                }
                return { done: true, value: undefined }
            },
        }
    }
}
