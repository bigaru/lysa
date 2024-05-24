import { expect, test } from 'bun:test'
import { lazyInit } from './index.js'

let foo = 'foo'

lazyInit('lateFoo', () => foo)
declare const lateFoo: string
foo = 'bar'

test('lazyInit global', () => {
    expect(lateFoo).toStrictEqual('bar')
})

test('lazyInit object', () => {
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
