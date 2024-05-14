type Callback = (evaluatedItem: any) => any

abstract class BaseStream {
    parent

    abstract each(callback: Callback): void

    filter(filterFn: (element) => boolean) {
        const stream = {
            __proto__: BaseStream.prototype,
            parent: this as BaseStream,

            each(callback: Callback) {
                this.parent.each((item) => {
                    if (filterFn(item)) {
                        callback(item)
                    }
                })
            },
        }

        return stream
    }

    map(mapFn: (element) => any) {
        const stream = {
            __proto__: BaseStream.prototype,
            parent: this as BaseStream,

            each(callback: Callback) {
                this.parent.each((item) => {
                    callback(mapFn(item))
                })
            },
        }

        return stream
    }
}

export class Stream extends BaseStream {
    parent = null
    value: any[]

    constructor(value: any[]) {
        super()
        this.value = value
    }

    each(callback: Callback): void {
        for (let i = 0; i < this.value.length; i++) {
            callback(this.value[i])
        }
    }
}
