import { describe, expect, it } from 'bun:test'
import { asArray, every, forEach, use } from '../src/index.js'

describe('stream', () => {
    it('should forEach', () => {
        let result: any = []
        use([1, 2, 3, 4]).complete(forEach((i) => result.push(i)))

        expect(result).toStrictEqual([1, 2, 3, 4])
    })

    it('should asArray', () => {
        let result = use([1, 2, 3, 4]).complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4])
    })

    it('should every', () => {
        let result = use([1, 2, 3, 4, 5]).complete(every((i) => typeof i === 'number'))

        expect(result).toStrictEqual(true)
    })
})
