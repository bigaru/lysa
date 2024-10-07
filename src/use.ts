import { from } from 'rxjs'
import { Stream } from './stream.js'

function use<T>(value: ReadonlyArray<T>): Stream<T>
function use(value: string): Stream<string>
function use<T>(value: Record<string, T>): Stream<[string, T]>
function use<T>(value: any): Stream<any> {
    if (Array.isArray(value)) {
        return new Stream<T>(() => from(value))
    }

    if (typeof value === 'string') {
        return new Stream<String>(() => from(value.split('')))
    }

    if (!!value && typeof value === 'object') {
        return new Stream<[string, T]>(() => from(Object.entries<T>(value)))
    }

    throw new Error(`type is not supported`)
}

export { use }
