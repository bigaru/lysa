import type { Observable } from 'rxjs'

export function forEach<T>(fn: (item: T) => void) {
    return (observable: Observable<T>) => {
        observable.subscribe((item: any) => fn(item))
    }
}
