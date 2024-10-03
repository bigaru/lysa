import { filter } from 'rxjs'

export function compact<T>() {
    return filter<T>((i) => !!i)
}
