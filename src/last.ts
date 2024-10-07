import type { Stream } from './stream'
import { takeLast } from 'rxjs'

export function last<T>() {
    return (stream: Stream<T>) => {
        let element: T | undefined

        stream
            .createObservable()
            .pipe(...(stream.ops as []), takeLast(1))
            .subscribe((item) => {
                element = item
            })
        return element
    }
}
