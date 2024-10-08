import { find as RxFind, findIndex as RxFindIndex, type Observable } from 'rxjs'

export function find<T>(predicate: (value: T, index: number) => boolean) {
    return (observable: Observable<T>) => {
        let found: T | undefined

        observable.pipe(RxFind<T>(predicate)).subscribe((item) => {
            found = item
        })
        return found
    }
}

export function findIndex<T>(predicate: (value: T, index: number) => boolean) {
    return (observable: Observable<T>) => {
        let index: number

        observable.pipe(RxFindIndex<T>(predicate)).subscribe((item) => {
            index = item
        })
        return index!
    }
}

export function some<T>(predicate: (value: T, index: number) => boolean) {
    return (observable: Observable<T>) => {
        let found: boolean

        observable.pipe(RxFind<T>(predicate)).subscribe((item) => {
            found = !!item
        })
        return found!
    }
}
