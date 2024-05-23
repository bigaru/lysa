import { BaseStream, Stream } from './stream.js'

export { lazyInit } from './lazy.js'

function isIterable<T>(val: any | Iterable<T>): val is Iterable<T> {
    return typeof val?.[Symbol.iterator] === 'function'
}

function use<T>(val: Iterable<T>): Stream<T>
function use<T>(val: any): Stream<T> {
    if (isIterable<T>(val)) {
        return new BaseStream<T>(val)
    }
    return undefined
}

export { use }
