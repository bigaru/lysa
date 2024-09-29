/**
 * For typing use `declare const variableName: T`
 */
export function lazyInit<T>(variableName: string, expensiveFunction: () => T, scope: any = globalThis) {
    const wrapper: {
        isSet: boolean
        value?: T
    } = {
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
