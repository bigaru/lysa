import type { Observable } from 'rxjs'

export function asArray<T>() {
    return (observable: Observable<T>) => {
        const arr: Array<T> = new Array()
        observable.subscribe((item) => arr.push(item))
        return arr
    }
}
