import { toArray, type Observable } from 'rxjs'

export function asArray<T>() {
    return (observable: Observable<T>) => {
        let arr: Array<T>
        observable.pipe(toArray()).subscribe((item) => {
            arr = item
        })
        return arr!
    }
}
