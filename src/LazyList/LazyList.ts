import { lazyInit } from '../lazyInit'

interface Node<ELEM> {
    kind: 'node'
    head: ELEM
    tail: LazyList<ELEM>

    pipe(...operators: OP[]): LazyList<any>
}

interface Nil {
    kind: 'nil'

    pipe(...operators: OP[]): LazyList<any>
}

type LazyList<ELEM> = Node<ELEM> | Nil

type OP<A = any, B = any> = (node: LazyList<A>) => LazyList<B>

class Node<ELEM> {
    kind: 'node' = 'node'
    head!: ELEM
    tail!: LazyList<ELEM>

    constructor(head: () => ELEM, tail: () => LazyList<ELEM>) {
        lazyInit('head', head, this)
        lazyInit('tail', tail, this)
    }

    pipe(): LazyList<any>
    pipe<A>(...operators: [OP<ELEM, A>]): LazyList<A>
    pipe<A, B>(...operators: [OP<ELEM, A>, OP<A, B>]): LazyList<B>
    pipe<A, B, C>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>]): LazyList<C>
    pipe<A, B, C, D>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, OP<C, D>]): LazyList<D>
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
