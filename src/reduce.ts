import { reverse } from './reverse.js'
import { type Observable, reduce as RxReduce } from 'rxjs'

function reduce<T, S = T>(accumulator: (acc: S | T, value: T, index: number) => S): (s: Observable<T>) => S | T
function reduce<T, S>(accumulator: (acc: S, value: T, index: number) => S, seed: S): (s: Observable<T>) => S
function reduce<T, S>(accumulator: (acc: S | T, value: T, index: number) => S, seed?: S): any {
    return (observable: Observable<T>) => {
        let element: S | T
        const reduceOperator = seed ? RxReduce(accumulator, seed) : RxReduce(accumulator)

        observable.pipe(reduceOperator).subscribe((item) => {
            element = item
        })
        return element!
    }
}

function reduceRight<T, S = T>(accumulator: (acc: S | T, value: T, index: number) => S): (s: Observable<T>) => S | T
function reduceRight<T, S>(accumulator: (acc: S, value: T, index: number) => S, seed: S): (s: Observable<T>) => S
function reduceRight<T, S>(accumulator: (acc: S | T, value: T, index: number) => S, seed?: S): any {
    return (observable: Observable<T>) => reduce(accumulator, seed as any)(observable.pipe(reverse()))
}

function sum<T = string>(): (s: Observable<T>) => T
function sum<T = number>(): (s: Observable<T>) => T
function sum(): any {
    return reduce<any>((acc, value) => acc + value)
}

function asObject<T>() {
    return reduce<[PropertyKey, T], Record<PropertyKey, T>>((acc, [key, val]) => {
        acc[key] = val
        return acc
    }, {})
}

export { reduce, reduceRight, sum, asObject }
