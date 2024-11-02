import { LazyList, Nil, Operator } from './LazyList'

function filter<T>(predicate: (item: T) => boolean): Operator<T, T> {
    return function operator(node: LazyList<T>): LazyList<T> {
        if (node.kind === 'nil') {
            return Nil
        }

        if (predicate(node.head)) {
            return new LazyList(
                () => node.head,
                () => node.tail.pipe(operator)
            )
        }

        return node.tail.pipe(operator)
    }
}

export { filter }
