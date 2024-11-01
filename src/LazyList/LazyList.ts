import { lazyInit } from '../lazyInit'

interface Pipe<ELEM> {
    pipe(): LazyList<ELEM>
    pipe<A>(...operators: [OP<ELEM, A>]): LazyList<A>
    pipe<A, B>(...operators: [OP<ELEM, A>, OP<A, B>]): LazyList<B>
    pipe<A, B, C>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>]): LazyList<C>
    pipe<A, B, C, D>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, OP<C, D>]): LazyList<D>
    pipe(...operators: OP[]): LazyList<any>
}

interface Node<ELEM> extends Pipe<ELEM> {
    kind: 'node'
    head: ELEM
    tail: LazyList<ELEM>
}

interface Nil extends Pipe<any> {
    kind: 'nil'
}

type LazyList<ELEM> = Node<ELEM> | Nil

type Operator<A, B> = (node: LazyList<A>) => LazyList<B>
type OP<A = any, B = any> = Operator<A, B>

class Node<ELEM> {
    kind: 'node' = 'node'
    head!: ELEM
    tail!: LazyList<ELEM>

    constructor(head: () => ELEM, tail: () => LazyList<ELEM>) {
        lazyInit('head', head, this)
        lazyInit('tail', tail, this)
    }

    pipe(...operators: OP[]): LazyList<any> {
        return operators.reduce((acc, fn) => fn(acc), this as LazyList<any>)
    }
}

const Nil: Nil = {
    kind: 'nil' as 'nil',
    pipe() {
        return this
    },
}

export { Nil, Node, type LazyList, type Operator }
