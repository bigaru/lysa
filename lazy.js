export function letLazy(name, expensiveFkt, scope = global || window) {
    const booleanName = `__is_set_${name}`
    const valueName = `__${name}_value`
    scope[booleanName] = false
    scope[valueName] = undefined

    Object.defineProperty(scope, name, {
        get() {
            if (scope[booleanName]) {
                return scope[valueName]
            }

            scope[valueName] = expensiveFkt()
            scope[booleanName] = true
            return scope[valueName]
        },
    })
}
