import { type Observable, min as RxMin } from 'rxjs'

export function min<T>(comparer?: (x: T, y: T) => number) {
    return (observable: Observable<T>) => {
        let element: T | undefined

        observable.pipe(RxMin(comparer)).subscribe((item) => {
            element = item
        })
        return element
    }
}
