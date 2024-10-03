import type { Stream } from './stream'

export function forEach<T>(fn: (item: T) => void) {
    return (stream: Stream<T>) => {
        stream
            .createObservable()
            .pipe(...(stream.ops as []))
            .subscribe((item: any) => fn(item))
    }
}
