import { zipWith, from, type OperatorFunction, type Cons } from 'rxjs'
import { CompletedStream, Stream } from './stream.js'

type Zip<T extends any[]> = {
    [K in keyof T]: T[K] extends (infer U)[] ? U : never
}

type ZipStream<T extends Stream<any>[]> = {
    [K in keyof T]: T[K] extends Stream<infer U> ? U : never
}

type ZipCompletedStream<T extends CompletedStream<any>[]> = {
    [K in keyof T]: T[K] extends CompletedStream<infer U> ? U : never
}

function zip<A, T extends CompletedStream<any>[]>(...inputs: T): OperatorFunction<A, Cons<A, ZipCompletedStream<T>>>
function zip<A, T extends Stream<any>[]>(...inputs: T): OperatorFunction<A, Cons<A, ZipStream<T>>>
function zip<A, T extends any[]>(...inputs: T): OperatorFunction<A, Cons<A, Zip<T>>>
function zip<A, T extends any[]>(...inputs: T) {
    const obs = inputs.map((i) => {
        if (i instanceof Stream) {
            return i.createObservable().pipe(...(i.ops as []))
        }
        if (i instanceof CompletedStream) {
            return i.subject
        }
        return from(i)
    })

    return zipWith<A, any>(...obs)
}

export { zip }
