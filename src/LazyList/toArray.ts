import { LazyList, TerminalOperator } from './LazyList.js'

function toArray<T>(): TerminalOperator<T, Array<T>> {
    return function operator(node: LazyList<T>): Array<T> {
        const result: T[] = []

        while (node.kind === 'node') {
            result.push(node.head)
            node = node.tail
        }

        return result
    }
}

export { toArray }
