export function attach(target, fn) {
    const symbol = Symbol(fn?.name)
    Object.defineProperty(target, symbol, { configurable: true, get: fn })
    return symbol
}
