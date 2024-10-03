import type { Stream } from './stream'

export function asArray<T>() {
    return (stream: Stream<T>) => {
        const arr: Array<T> = new Array()
        stream
            .createObservable()
            .pipe(...(stream.ops as []))
            .subscribe((item) => arr.push(item))
        return arr
    }
}
