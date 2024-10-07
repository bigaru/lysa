import type { Stream } from './stream'
import { max as RxMax } from 'rxjs'

export function max<T>(comparer?: (x: T, y: T) => number) {
    return (stream: Stream<T>) => {
        let element: T | undefined

        stream
            .createObservable()
            .pipe(...(stream.ops as []), RxMax(comparer))
            .subscribe((item) => {
                element = item
            })
        return element
    }
}
