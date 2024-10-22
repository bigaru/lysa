import { ReplaySubject, type Observable, type OperatorFunction, take, skip, of, map, concat, from, tap, concatWith, toArray } from 'rxjs'
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
    readonly observable: Observable<T>
    readonly ops: ReadonlyArray<OF>

    pointer = -1
    array: Array<T> = []

    constructor(ob: Observable<T>, ops: ReadonlyArray<OF> = []) {
        this.observable = ob
        this.ops = ops
    }

    perform(str: string, ...newOps: OF[]) {
        const dropCount = this.pointer + 1
        const skippedObs = this.observable.pipe(skip(dropCount), ...(this.ops as []))

        const newOb = concat(from(this.array).pipe(tap((i) => console.log(`${str}[${i}]`))), skippedObs)

        return new LazyList(newOb, newOps)
    }

    get(index: number) {
        if (this.pointer < index) {
            const dropCount = this.pointer + 1
            const takeCount = index - this.pointer
            this.pointer = index

            this.observable.pipe(...(this.ops as []), skip(dropCount), take(takeCount)).subscribe((item) => {
                console.log('>')
                this.array.push(item)
            })
        }

        return this.array[index]
    }
}
let list = new LazyList(of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10))

list = list.perform(
    '1>',
    map((i) => {
        console.log('map', i)
        return i + i
    })
)
console.log('-------->', list.get(1))

let list2 = list.perform(
    '2>',
    map((i) => {
        //console.log('<2>')
        return i * 2
    })
)
console.log('-------->', list2.get(3))

// how to stepwise evaluate rxjs stream

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

/*

sealed trait SimpleStream[+A] {
  def isEmpty: Boolean
  def head: A
  def tail: SimpleStream[A]

  def #::[B >: A](elem: B): SimpleStream[B] = new Cons(elem, this)

  def map[B](f: A => B): SimpleStream[B] = this match {
    case Empty => Empty
    case cons: Cons[A] => new Cons(f(cons.head), cons.tail.map(f))
  }

  def filter(p: A => Boolean): SimpleStream[A] = this match {
    case Empty => Empty
    case cons: Cons[A] =>
      if (p(cons.head))
        new Cons(cons.head, cons.tail.filter(p))
      else
        cons.tail.filter(p)
  }
}

case object Empty extends SimpleStream[Nothing] {
  def isEmpty: Boolean = true
  def head: Nothing = throw new NoSuchElementException("head of empty stream")
  def tail: SimpleStream[Nothing] = throw new UnsupportedOperationException("tail of empty stream")
}

class Cons[+A](hd: => A, tl: => SimpleStream[A]) extends SimpleStream[A] {
  def isEmpty: Boolean = false
  lazy val head: A = hd
  lazy val tail: SimpleStream[A] = tl
}

object SimpleStream {
  def cons[A](hd: => A, tl: => SimpleStream[A]): SimpleStream[A] = new Cons(hd, tl)
  def empty[A]: SimpleStream[A] = Empty
}

 */
