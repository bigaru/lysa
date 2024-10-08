import { take, type Observable } from 'rxjs'

export function head<T>() {
    return (observable: Observable<T>) => {
        let element: T | undefined

        observable.pipe(take(1)).subscribe((item) => {
            element = item
        })
        return element
    }
}
