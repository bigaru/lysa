import { concatWith, of, type OperatorFunction } from 'rxjs'
import { Stream } from './stream.js'

function concat<T>(...inputs: Stream<T>[]): OperatorFunction<any, T>
function concat<T>(...inputs: ReadonlyArray<T>[]): OperatorFunction<any, T>
function concat(...inputs: any[]) {
    const obs = inputs.map((i) => {
        if (i instanceof Stream) {
            return i.createObservable().pipe(...(i.ops as []))
        }
        return of(...i)
    })

    return concatWith(...obs)
}

export { concat }
