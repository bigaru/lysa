import { lazyInit } from '../lazyInit'

type Operator<A, B> = (node: LazyList<A>) => LazyList<B>
type TerminalOperator<A, B> = (node: LazyList<A>) => B

type OP<A = any, B = any> = Operator<A, B>
type TOP<A = any, B = any> = TerminalOperator<A, B>

class LazyList<ELEM> {
    kind = 'node'
    head!: ELEM
    tail!: LazyList<ELEM>

    constructor(head: () => ELEM, tail: () => LazyList<ELEM>) {
        lazyInit('head', head, this)
        lazyInit('tail', tail, this)
    }

    pipe(): LazyList<ELEM>
    pipe<A>(...operators: [OP<ELEM, A>]): LazyList<A>
    pipe<A>(...operators: [TOP<ELEM, A>]): A
    pipe<A, B>(...operators: [OP<ELEM, A>, OP<A, B>]): LazyList<B>
    pipe<A, B>(...operators: [OP<ELEM, A>, TOP<A, B>]): B
    pipe<A, B, C>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>]): LazyList<C>
    pipe<A, B, C>(...operators: [OP<ELEM, A>, OP<A, B>, TOP<B, C>]): C
    pipe<A, B, C, D>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, OP<C, D>]): LazyList<D>
    pipe<A, B, C, D>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, TOP<C, D>]): D
    pipe<A, B, C, D>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, OP<C, D>, ...OP[]]): LazyList<any>
    pipe<A, B, C, D, E>(...operators: [OP<ELEM, A>, OP<A, B>, OP<B, C>, OP<C, D>, ...OP[], TOP<any, E>]): E

    pipe<T extends OP[], S extends TOP>(...operators: [...T, S?]): any {
        return operators.reduce((acc, fn) => fn!(acc), this as any)
    }
}

const Nil: LazyList<any> = {
    kind: 'nil',
    head: undefined as any,
    tail: undefined as any,

    pipe(): any {
        return this
    },
}

export { Nil, LazyList, type Operator, type TerminalOperator }
