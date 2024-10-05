import type { Stream } from './stream'
import { count as RxCount } from 'rxjs'

export function count<T>(predicate?: (value: T, index: number) => boolean) {
    return (stream: Stream<T>) => {
        let no: number

        stream
            .createObservable()
            .pipe(...(stream.ops as []), RxCount<T>(predicate))
            .subscribe((item) => {
                no = item
            })
        return no!
    }
}
