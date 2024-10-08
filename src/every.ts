import { every as RxEvery, type Observable } from 'rxjs'

export function every<T>(predicate: (value: T, index: number) => boolean) {
    return (observable: Observable<T>) => {
        let element: boolean

        observable.pipe(RxEvery<T>(predicate)).subscribe((item) => {
            element = item
        })
        return element!
    }
}
