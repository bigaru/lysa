import type { Stream } from './stream'
import { take } from 'rxjs'

export function head<T>() {
    return (stream: Stream<T>) => {
        let element: T | undefined

        stream
            .createObservable()
            .pipe(...(stream.ops as []), take(1))
            .subscribe((item) => {
                element = item
            })
        return element
    }
}
