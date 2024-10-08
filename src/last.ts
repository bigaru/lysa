import { type Observable, takeLast } from 'rxjs'

export function last<T>() {
    return (observable: Observable<T>) => {
        let element: T | undefined

        observable.pipe(takeLast(1)).subscribe((item) => {
            element = item
        })
        return element
    }
}
