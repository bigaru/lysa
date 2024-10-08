import { Observable, from, mergeMap, reduce, type OperatorFunction } from 'rxjs'

export function reverse<T>(): OperatorFunction<T, T> {
    return (ob: Observable<T>) => {
        return ob.pipe(
            reduce<T, T[]>((acc, value) => [value, ...acc], []),
            mergeMap<T[], Observable<T>>((item) => from(item))
        )
    }
}
