import { describe, expect, it } from 'bun:test'
import { asArray, compact, concat, map, use } from '../src/index.js'

describe('stream', () => {
    it('should compact', () => {
        let result = use([1, 0, 2, false, 3, '', 4]).perform(compact()).complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4])
    })

    it('should concat raw values', () => {
        let result = use([1, 2])
            .perform(concat([3, 4], [5, 6]))
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it('should concat stream values', () => {
        let second = use([1, 2]).perform(map((i) => i * 2))
        let third = use([2, 3]).perform(map((i) => i * 3))

        let result = use([1, 2]).perform(concat(second, third)).complete(asArray())

        expect(result).toStrictEqual([1, 2, 2, 4, 6, 9])
    })
})
