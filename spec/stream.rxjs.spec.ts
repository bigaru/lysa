import { describe, expect, it } from 'bun:test'
import { asArray, chunk, distinct, drop, dropRight, dropWhile, filter, forEach, map, take, takeRight, takeWhile, use } from '../src/index.js'

describe('stream', () => {
    it('should filter', () => {
        let result = use([1, 2, 3, 4])
            .perform(filter((i) => i % 2 === 0))
            .complete(asArray())

        expect(result).toStrictEqual([2, 4])
    })

    it('should map', () => {
        let result = use([1, 2, 3, 4])
            .perform(map((i) => i * i))
            .complete(asArray())

        expect(result).toStrictEqual([1, 4, 9, 16])
    })

    it('should distinct', () => {
        let result = use([1, 2, 3, 2, 4, 5, 3, 4]).perform(distinct()).complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should take', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(take(5)).complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should takeRight', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(takeRight(5)).complete(asArray())

        expect(result).toStrictEqual([6, 7, 8, 9, 10])
    })

    it('should takeWhile', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .perform(takeWhile((i) => i <= 5))
            .complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should drop', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(drop(5)).complete(asArray())

        expect(result).toStrictEqual([6, 7, 8, 9, 10])
    })

    it('should dropRight', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(dropRight(5)).complete(asArray())

        expect(result).toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should dropWhile', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .perform(dropWhile((i) => i <= 5))
            .complete(asArray())

        expect(result).toStrictEqual([6, 7, 8, 9, 10])
    })

    it('should chunk', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9]).perform(chunk(2)).complete(asArray())

        expect(result).toStrictEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
    })
})
