import type { Stream } from './stream'
import { find as RxFind, findIndex as RxFindIndex } from 'rxjs'

export function find<T>(predicate: (value: T, index: number) => boolean) {
    return (stream: Stream<T>) => {
        let found: T | undefined

        stream
            .createObservable()
            .pipe(...(stream.ops as []), RxFind<T>(predicate))
            .subscribe((item) => {
                found = item
            })
        return found
    }
}

export function findIndex<T>(predicate: (value: T, index: number) => boolean) {
    return (stream: Stream<T>) => {
        let index: number

        stream
            .createObservable()
            .pipe(...(stream.ops as []), RxFindIndex<T>(predicate))
            .subscribe((item) => {
                index = item
            })
        return index!
    }
}
