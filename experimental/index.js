import './string.js'

export * from './symbols.js'

export function attach(target, fn) {
    const symbol = Symbol(fn?.name)
    target[symbol] = fn
    return symbol
}
