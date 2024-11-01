import { LazyList, Nil, Node } from './LazyList'

function isFn<T>(item: T | (() => LazyList<T>)): item is () => LazyList<T> {
    return typeof item === 'function'
}

// example: let boo: LazyList<number> = from([1, 2, 3, 4, () => boo.pipe(map((i) => i * i))])
function from<T>(elements: [...T[], () => LazyList<T>]): LazyList<T>
function from<T>(elements: T[]): LazyList<T>
function from<T>(elements: any[]): LazyList<T> {
    const last = elements.at(-1)
    let initial = () => Nil as LazyList<any>

    if (isFn(last)) {
        initial = last
        elements = elements.slice(0, -1)
    }

    elements = elements.map((item) => () => item)

    return elements.reverse().reduce((acc, elem) => {
        return () => new Node<T>(elem, acc)
    }, initial)()
}

export { from }
