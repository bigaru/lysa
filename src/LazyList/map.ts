import { LazyList, Nil, Operator } from './LazyList.js'

function map<A, B>(project: (item: A) => B): Operator<A, B> {
    return function operator(node: LazyList<A>): LazyList<B> {
        if (node.kind === 'nil') {
            return Nil
        }

        return new LazyList(
            () => project(node.head),
            () => node.tail.pipe(operator)
        )
    }
}

export { map }
