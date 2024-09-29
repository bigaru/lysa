import { ArrayStream, asArray, forEach } from './stream.js'

export { distinct, skip as drop, skipLast as dropRight, skipWhile as dropWhile, filter, map, take, takeLast as takeRight, takeWhile } from 'rxjs'

export { lazyInit } from './lazyInit.js'

export function use<T>(value: ReadonlyArray<T>) {
    return new ArrayStream(value)
}

export { asArray, forEach }
