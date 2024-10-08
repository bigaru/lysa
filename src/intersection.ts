import { filter } from 'rxjs'

export function intersection<T>(array: ReadonlyArray<T>, equalityFn?: (a: T, b: T) => boolean) {
    if (equalityFn) {
        return filter<T>((item) => array.some((arrayItem) => equalityFn(item, arrayItem)))
    }

    return filter<T>((item) => array.includes(item))
}
