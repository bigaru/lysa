import { concatWith, type Observable, of, type OperatorFunction } from 'rxjs'
import { Stream } from './stream.js'

function concat<T>(...inputs: Stream<T>[]): OperatorFunction<any, T>
function concat<T>(...inputs: T[][]): OperatorFunction<any, T>
function concat(...inputs: any[]) {
    const obs: Observable<any>[] = []

    inputs.forEach((i) => {
        if (i instanceof Stream) {
            const ob = i.createObservable().pipe(...(i.ops as []))
            obs.push(ob)
        } else {
            obs.push(of(...i))
        }
    })

    return concatWith(...obs)
}

export { concat }
