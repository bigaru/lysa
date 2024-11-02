import { LazyList, Nil, Operator } from './LazyList.js'

function chunk<T>(size: number): Operator<T, T[]> {
    return function operator(node: LazyList<T>): LazyList<T[]> {
        if (node.kind === 'nil') {
            return Nil
        }

        const newHead = () => {
            const array: T[] = []

            for (let i = 0; i < size && node.kind === 'node'; i++) {
                array.push(node.head)
                node = node.tail
            }

            return array
        }

        return new LazyList(newHead, () => node.pipe(operator))
    }
}

export { chunk }
