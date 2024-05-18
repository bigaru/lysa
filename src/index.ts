import { BaseStream, Stream } from './stream.js'

export { lazyInit } from './lazy.js'

function use<T>(val: T[]): Stream<T>
function use<T>(val: any): Stream<T> {
    if (Array.isArray(val)) {
        return new BaseStream<T>(val)
    }
    return undefined
}

export { use }
