import { describe, expect, it } from 'bun:test'
import { asArray, compact, concat, map, use, tail, flatten, flatMap, reverse, range, intersection, difference, zip, sort } from '../src/index.js'

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

    it('should concat completed stream values', () => {
        let second = use([1, 2]).complete()
        let third = use([2, 3]).complete()

        let result = use([1, 2]).perform(concat(second, third)).complete(asArray())

        expect(result).toStrictEqual([1, 2, 1, 2, 2, 3])
    })

    it('should zip raw values', () => {
        let result = use([1, 2, 3, 4])
            .perform(zip(['a', 'b', 'c', 'd'], [5, 6, 7, 8]))
            .complete(asArray())

        expect(result).toStrictEqual([
            [1, 'a', 5],
            [2, 'b', 6],
            [3, 'c', 7],
            [4, 'd', 8],
        ])
    })

    it('should zip stream values', () => {
        let second = use([1, 2]).perform(map((i) => i * 2))
        let third = use([2, 3]).perform(map((i) => '' + i * 3))

        let result = use([1, 2]).perform(zip(second, third)).complete(asArray())

        expect(result).toStrictEqual([
            [1, 2, '6'],
            [2, 4, '9'],
        ])
    })

    it('should zip completed stream values', () => {
        let second = use([2, 4]).complete()
        let third = use(['6', '9']).complete()

        let result = use([1, 2]).perform(zip(second, third)).complete(asArray())

        expect(result).toStrictEqual([
            [1, 2, '6'],
            [2, 4, '9'],
        ])
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

    it('should intersection', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .perform(intersection([2, 4, 6, 8]))
            .complete(asArray())
        expect(result).toStrictEqual([2, 4, 6, 8])
    })

    it('should intersection with multiple', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .perform(intersection([2, 4, 6, 8], [1, 2, 3, 4, 5]))
            .complete(asArray())
        expect(result).toStrictEqual([2, 4])
    })

    it('should intersection with comparator', () => {
        let result = use([{ food: 'banana' }, { food: 'apple' }, { food: 'pear' }, { food: 'cherry' }])
            .perform(
                intersection([{ food: 'pear' }, { food: 'apple' }, { food: 'banana' }, { food: 'peach' }], [{ food: 'avocado' }, { food: 'apple' }, { food: 'pineapple' }], (a, b) => a.food === b.food)
            )
            .complete(asArray())
        expect(result).toStrictEqual([{ food: 'apple' }])
    })

    it('should difference', () => {
        let result = use([1, 2, 3, 4])
            .perform(difference([3, 4, 5, 6]))
            .complete(asArray())
        expect(result).toStrictEqual([1, 2])
    })

    it('should difference with multiple', () => {
        let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .perform(difference([2, 4, 6, 8], [1, 2, 3, 4, 5]))
            .complete(asArray())
        expect(result).toStrictEqual([7, 9, 10])
    })

    it('should difference with comparator', () => {
        let result = use([{ food: 'banana' }, { food: 'apple' }, { food: 'pear' }, { food: 'cherry' }, { food: 'coconut' }])
            .perform(
                difference(
                    [{ food: 'cake' }, { food: 'apple' }, { food: 'banana' }, { food: 'peach' }],
                    [{ food: 'avocado' }, { food: 'apple' }, { food: 'pineapple' }, { food: 'cherry' }],
                    (a, b) => a.food === b.food
                )
            )
            .complete(asArray())
        expect(result).toStrictEqual([{ food: 'pear' }, { food: 'coconut' }])
    })

    it('should sort', () => {
        let result = use([4, 1, 3, 2, 3, 5]).perform(sort()).complete(asArray())
        expect(result).toStrictEqual([1, 2, 3, 3, 4, 5])
    })

    it('should sort with comparator', () => {
        let result = use(['x', 'y', 'z', 'a', 'b', 'c'])
            .perform(sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0)))
            .complete(asArray())

        expect(result).toStrictEqual(['z', 'y', 'x', 'c', 'b', 'a'])
    })
})
