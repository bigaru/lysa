import { ArrayStream, asArray } from './stream.js'
import { filter, map } from 'rxjs'

export { lazyInit } from './lazyInit.js'

export function use<T>(value: ReadonlyArray<T>) {
    return new ArrayStream(value)
}

export { asArray }

export { filter, map }
