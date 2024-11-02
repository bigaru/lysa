import { describe, expect, it } from 'bun:test'
import { chunk, filter, from, map, toArray } from '../src/LazyList/'

describe('LazyList', () => {
    it('should map', () => {
        let list = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
            map((i) => i * 2),
            toArray()
        )

        expect(list).toStrictEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
    })

    it('should filter', () => {
        let list = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
            filter((i) => i % 2 === 0),
            toArray()
        )

        expect(list).toStrictEqual([2, 4, 6, 8, 10])
    })

    it('should chunk with remainder', () => {
        let list = from([1, 2, 3, 4, 5]).pipe(chunk(2), toArray())

        expect(list).toStrictEqual([[1, 2], [3, 4], [5]])
    })

    it('should chunk', () => {
        let list = from([1, 2, 3, 4, 5, 6]).pipe(chunk(3), toArray())

        expect(list).toStrictEqual([
            [1, 2, 3],
            [4, 5, 6],
        ])
    })
})
