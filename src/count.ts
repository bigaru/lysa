import { count as RxCount, type Observable } from 'rxjs'

export function count<T>(predicate?: (value: T, index: number) => boolean) {
    return (observable: Observable<T>) => {
        let no: number

        observable.pipe(RxCount<T>(predicate)).subscribe((item) => {
            no = item
        })
        return no!
    }
}
