import { reverse } from './reverse.js'
import type { Stream } from './stream'
import { reduce as RxReduce } from 'rxjs'

function reduce<T, S = T>(accumulator: (acc: S | T, value: T, index: number) => S): (s: Stream<T>) => S | T
function reduce<T, S>(accumulator: (acc: S, value: T, index: number) => S, seed: S): (s: Stream<T>) => S
function reduce<T, S>(accumulator: (acc: S | T, value: T, index: number) => S, seed?: S): any {
    return (stream: Stream<T>) => {
        let element: S | T
        const reduceOperator = seed ? RxReduce(accumulator, seed) : RxReduce(accumulator)

        stream
            .createObservable()
            .pipe(...(stream.ops as []), reduceOperator)
            .subscribe((item) => {
                element = item
            })
        return element!
    }
}

function reduceRight<T, S = T>(accumulator: (acc: S | T, value: T, index: number) => S): (s: Stream<T>) => S | T
function reduceRight<T, S>(accumulator: (acc: S, value: T, index: number) => S, seed: S): (s: Stream<T>) => S
function reduceRight<T, S>(accumulator: (acc: S | T, value: T, index: number) => S, seed?: S): any {
    return (stream: Stream<T>) => reduce(accumulator, seed as any)(stream.perform(reverse()))
}

function sum<T = string>(): (s: Stream<T>) => T
function sum<T = number>(): (s: Stream<T>) => T
function sum(): any {
    return reduce<any>((acc, value) => acc + value)
}

export { reduce, reduceRight, sum }
