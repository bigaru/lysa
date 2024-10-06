import { type Observable, map, mergeMap, of, type OperatorFunction, type ValueFromArray } from 'rxjs'
import { Stream } from './stream'

type ElementOrArray<T> = T | Array<ElementOrArray<T>> | Stream<ElementOrArray<T>>
type Project<T, S> = (value: T, index: number) => S
type DeepArrayElement<T> = T extends (infer U)[] ? DeepArrayElement<U> : T

function createFlatten<T>(recursive?: boolean) {
    return function innerFlatten(item: ElementOrArray<T>): Observable<ElementOrArray<T>> {
        let observable = of(item)

        if (Array.isArray(item)) {
            observable = of(...item)
        }

        if (item instanceof Stream) {
            observable = item.createObservable().pipe(...(item.ops as []), mergeMap(innerFlatten))
        }

        if ((Array.isArray(item) || item instanceof Stream) && recursive) {
            observable = observable.pipe(mergeMap(innerFlatten))
        }

        return observable
    }
}

function flatten<T>(recursive: true): OperatorFunction<ElementOrArray<T>, T>
function flatten<T>(recursive?: boolean): OperatorFunction<ElementOrArray<T>, ElementOrArray<T>>
function flatten<T>(recursive?: boolean): any {
    return mergeMap<ElementOrArray<T>, Observable<ElementOrArray<T>>>(createFlatten(recursive))
}

function flatMap<A, B extends any[], T = DeepArrayElement<B>>(project: Project<A, B>, recursive: true): OperatorFunction<ElementOrArray<A>, T>
function flatMap<A, B extends any[], T = ValueFromArray<B>>(project: Project<A, B>, recursive?: boolean): OperatorFunction<ElementOrArray<A>, ElementOrArray<T>>
function flatMap<A, B extends any[]>(project: Project<ElementOrArray<A>, ElementOrArray<B>>, recursive?: boolean): any {
    const flatFn = createFlatten<B>(recursive)

    return mergeMap((item: ElementOrArray<A>, index) => {
        let updated: ElementOrArray<B>

        if (item instanceof Stream) {
            updated = item.perform(map(project))
        } else {
            updated = project(item, index)
        }

        return flatFn(updated)
    })
}

export { flatMap, flatten }
