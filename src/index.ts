import { concatWith, filter, Observable, of, type OperatorFunction } from 'rxjs'
import { ArrayStream, asArray, forEach } from './stream.js'
export { lazyInit } from './lazyInit.js'

export function use<T>(value: ReadonlyArray<T>) {
    return new ArrayStream(value)
}

/*
 * Operators
 */

export {
    bufferCount as chunk,
    distinct,
    skip as drop,
    skipLast as dropRight,
    skipWhile as dropWhile,
    filter,
    map,
    take,
    takeLast as takeRight,
    takeWhile,
} from 'rxjs'

export function compact<T>() {
    return filter<T>((i) => !!i)
}

function concat<T>(...inputs: ArrayStream<T>[]): OperatorFunction<any, T>
function concat<T>(...inputs: T[][]): OperatorFunction<any, T>
function concat<T>(...inputs: any[]) {
    let obs: Observable<any>[] = []

    if (inputs[0] instanceof ArrayStream) {
        const arr = inputs as ArrayStream<T>[]
        obs = arr.map((i) => of(...i.value).pipe(...(i.ops as [])))
    } else {
        obs = inputs.map((i) => of(...i))
    }

    return concatWith(...obs)
}

export { concat }

/*
 * Completion Operators
 */

export { asArray, forEach }
