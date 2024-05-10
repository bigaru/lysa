export function x(strings: TemplateStringsArray, ...expressions: any[]) {
    let code = strings[0]

    for (let i = 0; i < expressions.length; i++) {
        code += expressions[i]
        code += strings[i + 1]
    }

    code = code.replaceAll('#', '__args.v')

    return (...params: any[]) => {
        const __args: any = {}

        for (let j = 0; j < params.length; j++) {
            __args['v' + j] = params[j]
        }

        eval(code)
    }
}
