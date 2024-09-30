import { concatWith, filter, generate, Observable, of, type OperatorFunction } from 'rxjs'
import { Stream, asArray, forEach } from './stream.js'
export { lazyInit } from './lazyInit.js'

function use<T>(value: ReadonlyArray<T>): Stream<T>
function use(value: string): Stream<string>
function use<T>(value: Record<string, T>): Stream<[string, T]>
function use<T>(value: any): Stream<any> {
    if (Array.isArray(value)) {
        return new Stream<T>(() => of(...value))
    }

    if (typeof value === 'string') {
        return new Stream<String>(() => of(...value.split('')))
    }

    if (!!value && typeof value === 'object') {
        return new Stream<[string, T]>(() => of(...Object.entries<T>(value)))
    }

    throw new Error(`type is not supported`)
}

function range(stop: number): Stream<number>
function range(start: number, stop: number, step?: number): Stream<number>
function range(startOrStop: number, stop?: number, step?: number): Stream<number> {
    const initialState = stop ? startOrStop : 0
    const updateStop = stop ? stop : startOrStop
    const updatedStep = step ?? 1

    return new Stream<number>(() =>
        generate({
            initialState,
            condition: (i) => i < updateStop,
            iterate: (i) => i + updatedStep,
        })
    )
}

export { use, range }

/*
 * Operators
 */

export {
    bufferCount as chunk,
    distinct,
    skip as drop,
    skipLast as dropRight,
    skipWhile as dropWhile,
    filter,
    map,
    take,
    takeLast as takeRight,
    takeWhile,
} from 'rxjs'

export function compact<T>() {
    return filter<T>((i) => !!i)
}

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

/*
 * Completion Operators
 */

export { asArray, forEach }
