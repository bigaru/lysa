import { from, mergeMap, toArray, type Observable, type OperatorFunction } from 'rxjs'

export function sort<T>(comparer?: (x: T, y: T) => number): OperatorFunction<T, T> {
    return (ob: Observable<T>) => {
        return ob.pipe(
            toArray(),
            mergeMap<T[], Observable<T>>((item) => from(item.sort(comparer)))
        )
    }
}
