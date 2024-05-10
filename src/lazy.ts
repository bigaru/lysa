interface Indexable {
    [index: string]: any
}

/**
 * Warning: one has to set manually `declare const variableName: T`
 */
export function lazyInit<T>(variableName: string, expensiveFunction: () => T, scope: Indexable = globalThis) {
    const booleanName = `__is_set_${variableName}__`
    const valueName = `__${variableName}_value__`
    scope[booleanName] = false
    scope[valueName] = undefined

    Object.defineProperty(scope, variableName, {
        get() {
            if (scope[booleanName]) {
                return scope[valueName]
            }

            scope[valueName] = expensiveFunction()
            scope[booleanName] = true
            return scope[valueName]
        },
    })
}
