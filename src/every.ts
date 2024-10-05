import type { Stream } from './stream'
import rxjs from 'rxjs'

export function every<T>(predicate: (value: T, index: number) => boolean) {
    return (stream: Stream<T>) => {
        let element: boolean

        stream
            .createObservable()
            .pipe(...(stream.ops as []), rxjs.every<T>(predicate))
            .subscribe((item) => {
                element = item
            })
        return element!
    }
}
