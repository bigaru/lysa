import { mergeMap, of, type Observable, type OperatorFunction } from 'rxjs'

type ElementOrArray<T> = T | Array<ElementOrArray<T>>

function flatten<T>(recursive: true): OperatorFunction<ElementOrArray<T>, T>
function flatten<T>(recursive?: boolean): OperatorFunction<ElementOrArray<T>, ElementOrArray<T>>
function flatten<T>(recursive?: boolean): any {
    function innerFlatten<T>(item: ElementOrArray<T>): Observable<ElementOrArray<T>> {
        if (Array.isArray(item)) {
            let observable = of(...item)

            if (recursive) {
                observable = observable.pipe(mergeMap(innerFlatten))
            }
            return observable
        }

        return of(item)
    }

    return mergeMap<ElementOrArray<T>, Observable<ElementOrArray<T>>>(innerFlatten)
}

export { flatten }
