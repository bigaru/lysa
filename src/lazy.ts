/**
 * Warning: one has to set manually `declare const variableName: T`
 */
export function lazyInit<T>(variableName: string, expensiveFunction: () => T, scope: any = globalThis) {
    const wrapper = {
        isSet: false,
        value: undefined,
    }

    Object.defineProperty(scope, variableName, {
        get() {
            if (wrapper.isSet) {
                return wrapper.value
            }

            wrapper.value = expensiveFunction()
            wrapper.isSet = true
            return wrapper.value
        },
    })
}
