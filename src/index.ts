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
function concat(...inputs: any[]) {
    const obs: Observable<any>[] = []

    inputs.forEach((i) => {
        if (i instanceof ArrayStream) {
            const ob = of(...i.value).pipe(...(i.ops as []))
            obs.push(ob)
        } else {
            obs.push(of(...i))
        }
    })

    return concatWith(...obs)
}

export { concat }

/*
 * Completion Operators
 */

export { asArray, forEach }
