import { describe, expect, it } from 'bun:test'
import { asArray, compact, concat, map, use, tail, flatten, flatMap, reverse, range } from '../src/index.js'

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

    it('should tail', () => {
        let result = use([1, 2, 3, 4, 5]).perform(tail()).complete(asArray())

        expect(result).toStrictEqual([2, 3, 4, 5])
    })

    it('should flatten', () => {
        let result = use([[1, 2], 3, [4, [5, 6, [7, 8, [9]]]]])
            .perform(flatten())
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, [5, 6, [7, 8, [9]]]])
    })

    it('should flatten with stream', () => {
        let result = use([[1, 2], 3, use([4, [5, 6]])])
            .perform(flatten())
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it('should flatten recursively', () => {
        let result = use([[1, 2], 3, [4, use([5, 6, [7, 8, use([9])]])]])
            .perform(flatten(true))
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('should flatMap', () => {
        let result = use([1, 2, 3])
            .perform(flatMap((i) => new Array(i).fill(i) as number[]))
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 2, 3, 3, 3])
    })

    it('should flatMap with stream', () => {
        let result = use([1, 2, 3, use([4, 5, 6])])
            .perform(flatMap((i) => [i, i * i]))
            .complete(asArray())

        expect(result).toStrictEqual([1, 1, 2, 4, 3, 9, 4, 16, 5, 25, 6, 36])
    })

    it('should flatMap recursively', () => {
        let result = use([1, 2, 3, use([4, 5, 6])])
            .perform(flatMap((i) => [[[i, i * i]]], true))
            .complete(asArray())

        expect(result).toStrictEqual([1, 1, 2, 4, 3, 9, 4, 16, 5, 25, 6, 36])
    })

    it('should reverse', () => {
        let result = range(4).perform(reverse()).complete(asArray())
        expect(result).toStrictEqual([3, 2, 1, 0])
    })
})
