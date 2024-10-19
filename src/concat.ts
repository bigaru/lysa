import { concatWith, from, type OperatorFunction } from 'rxjs'
import { CompletedStream, Stream } from './stream.js'

type Input<T> = CompletedStream<T> | Stream<T> | ReadonlyArray<T>

function concat<T>(...inputs: Input<T>[]): OperatorFunction<any, T> {
    const obs = inputs.map((i) => {
        if (i instanceof Stream) {
            return i.createObservable().pipe(...(i.ops as []))
        }
        if (i instanceof CompletedStream) {
            return i.subject
        }
        return from(i)
    })

    return concatWith(...obs)
}

export { concat }
