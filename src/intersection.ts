import { filter, type OperatorFunction } from 'rxjs'

function intersection<T, S extends ReadonlyArray<T>[]>(...args: [...S]): OperatorFunction<T, T>
function intersection<T, S extends ReadonlyArray<T>[]>(...args: [...S, (a: T, b: T) => boolean]): OperatorFunction<T, T>
function intersection<T>(...arrays: any[]) {
    const equalityFn = arrays[arrays.length - 1]
    const restArrays = arrays.slice(0, -1)

    const isLastFn = typeof equalityFn === 'function'
    const arrayOfArrays = isLastFn ? restArrays : arrays

    return filter<T>((item) =>
        arrayOfArrays.every((array: T[]) => {
            if (isLastFn) {
                return array.some((arrayItem) => equalityFn(item, arrayItem))
            }
            return array.includes(item)
        })
    )
}

export { intersection }
