import { expect, describe, it } from 'bun:test'
import { lazyInit } from '../src/index.js'

let foo = 'foo'

declare const lateFoo: string
lazyInit('lateFoo', () => {
    console.log('computed')
    return foo
})

foo = 'bar'
console.log(lateFoo)
console.log(lateFoo)
console.log(lateFoo)

describe('lazyInit', () => {
    it('in global', () => {
        expect(lateFoo).toStrictEqual('bar')
    })

    it('in object', () => {
        class Noo {
            prop1 = 'overflow'

            constructor() {
                lazyInit('prop2', () => this.prop1, this)
                this.prop1 = 'rainbow'
            }
        }

        const nooObj: any = new Noo()
        expect(nooObj.prop2).toStrictEqual('rainbow')
    })
})
