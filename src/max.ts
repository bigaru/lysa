import { type Observable, max as RxMax } from 'rxjs'

export function max<T>(comparer?: (x: T, y: T) => number) {
    return (observable: Observable<T>) => {
        let element: T | undefined

        observable.pipe(RxMax(comparer)).subscribe((item) => {
            element = item
        })
        return element
    }
}
