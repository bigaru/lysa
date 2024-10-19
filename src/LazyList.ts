import { ReplaySubject, type Observable, type OperatorFunction } from 'rxjs'
import { asArray } from './asArray.js'

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

class LazyList<T> {
    readonly subject = new ReplaySubject<T>()
    readonly ops: ReadonlyArray<OF>

    evaluatedIndex = -1
    evaluatedArray: Array<T> = []

    constructor(ops: ReadonlyArray<OF> = []) {
        this.ops = ops
    }

    perform(...newOps: OF[]) {
        return new LazyList(this.ops.concat(newOps))
    }

    // open
    // how to store evaluated values ?
    // how to transfer to new LazyList ?
    // maybe elementAt operator ?
    get(idx: number) {
        if (this.evaluatedIndex < idx) {
            // drop evaluatedIndex + 1
            // take idx - evaluatedIndex
        }

        return this.evaluatedArray[idx]
    }
}

/*
def isPrime(n: Int): Boolean = {
  println(s">${n}")
  var result = false

  if (n > 1) then
    result = (2 to math.sqrt(n).toInt).forall(n % _ != 0)
  end if

  result
}

val primes: LazyList[Int] = LazyList.from(2).filter(isPrime)

println("First 10 prime numbers:")
primes.take(10).foreach(println)

//println(s"1000th prime number: ${primes(40)}")
primes.take(20).foreach(println)

 */
