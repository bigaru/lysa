import { Stream } from './stream.js'

function isIterable<T>(val: any | Iterable<T>): val is Iterable<T> {
    return typeof val?.[Symbol.iterator] === 'function'
}

function use<T>(val: Iterable<T>): Stream<T>
function use<T>(val: any): Stream<T> {
    if (isIterable<T>(val)) {
        return new Stream<T>(val)
    }
    return undefined
}

export { use }
export { lazyInit } from './lazy.js'
