export function extend(target, fn) {
    const symbol = Symbol(fn?.name)
    target[symbol] = fn
}
