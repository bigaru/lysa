import { concatWith, filter, of } from 'rxjs'
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

export function concat<T>(...inputs: T[][]) {
    const obs = inputs.map((i) => of(...i))
    return concatWith(...obs)
}

/*
 * Completion Operators
 */

export { asArray, forEach }
