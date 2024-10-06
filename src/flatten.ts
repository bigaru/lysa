import { mergeMap, of, type Observable, type OperatorFunction } from 'rxjs'
import { Stream } from './stream'

type ElementOrArray<T> = T | Array<ElementOrArray<T>> | Stream<ElementOrArray<T>>

function flatten<T>(recursive: true): OperatorFunction<ElementOrArray<T>, T>
function flatten<T>(recursive?: boolean): OperatorFunction<ElementOrArray<T>, ElementOrArray<T>>
function flatten<T>(recursive?: boolean): any {
    function innerFlatten<T>(item: ElementOrArray<T>): Observable<ElementOrArray<T>> {
        let observable = of(item)

        if (Array.isArray(item)) {
            observable = of(...item)
        }

        if (item instanceof Stream) {
            observable = item.createObservable().pipe(...(item.ops as []))
        }

        if ((Array.isArray(item) || item instanceof Stream) && recursive) {
            observable = observable.pipe(mergeMap(innerFlatten))
        }

        return observable
    }

    return mergeMap<ElementOrArray<T>, Observable<ElementOrArray<T>>>(innerFlatten)
}

export { flatten }
