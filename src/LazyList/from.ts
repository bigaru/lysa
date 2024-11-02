import { LazyList, Nil } from './LazyList.js'

function isFn<T>(item: T | (() => LazyList<T>)): item is () => LazyList<T> {
    return typeof item === 'function'
}

function from<T>(elements: [...T[], () => LazyList<T>]): LazyList<T>
function from<T>(elements: T[]): LazyList<T>
function from<T>(elements: any[]): LazyList<T> {
    const last = elements.at(-1)
    let initial = () => Nil

    if (isFn(last)) {
        initial = last
        elements = elements.slice(0, -1)
    }

    elements = elements.map((item) => () => item)

    return elements.reverse().reduce((acc, elem) => {
        return () => new LazyList<T>(elem, acc)
    }, initial)()
}

export { from }
