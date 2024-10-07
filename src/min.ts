import type { Stream } from './stream'
import { min as RxMin } from 'rxjs'

export function min<T>(comparer?: (x: T, y: T) => number) {
    return (stream: Stream<T>) => {
        let element: T | undefined

        stream
            .createObservable()
            .pipe(...(stream.ops as []), RxMin(comparer))
            .subscribe((item) => {
                element = item
            })
        return element
    }
}
