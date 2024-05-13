type Callback = (evaluatedItem: any) => any

abstract class BaseStream {
    parent

    abstract each(callback: Callback): void

    filter(filterFn: (element) => boolean) {
        const stream = {
            parent: this as BaseStream,
            each(callback: Callback) {
                this.parent.each((item) => {
                    if (filterFn(item)) {
                        callback(item)
                    }
                })
            },
        }

        Object.setPrototypeOf(stream, this)
        return stream
    }

    map(mapFn: (element) => any) {
        const stream = {
            parent: this as BaseStream,
            each(callback: Callback) {
                this.parent.each((item) => {
                    callback(mapFn(item))
                })
            },
        }

        Object.setPrototypeOf(stream, this)
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

class FilterStream extends BaseStream {
    filterFn

    constructor(parent: BaseStream, filterFn: (element) => boolean) {
        super()
        this.parent = parent
        this.filterFn = filterFn
    }

    each(callback: Callback): void {
        this.parent.each((item) => {
            if (this.filterFn(item)) {
                callback(item)
            }
        })
    }
}
