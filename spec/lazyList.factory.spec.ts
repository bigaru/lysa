import { expect, describe, it } from 'bun:test'
import { LazyList, from, map, toArray } from '../src/LazyList/'

describe('from', () => {
    it('should create LazyList using static data', () => {
        let list = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(toArray())

        expect(list).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('should create LazyList dynamically', () => {
        let list: LazyList<number> = from([1, 2, () => list.pipe(map((i) => i + 1))])
        const result: number[] = []

        for (let i = 0; i < 10; i++) {
            result.push(list.head)
            list = list.tail
        }

        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
})
