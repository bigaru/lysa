import { beforeAll, describe, expect, it } from 'bun:test'
import { asArray, count, every, filter, head, last, map, max, min, sum, use, type CompletedStream } from '../src/index.js'
import { tap } from 'rxjs'

describe('completedStream', () => {
    let cs: CompletedStream<number>

    beforeAll(() => {
        cs = use([4, 2, 1, 3, 5, 7, 9, 8, 6])
            .perform(
                filter((i) => i % 2 === 0),
                map((i) => i * i)
                //tap((i) => console.log('>' + i))
            )
            .complete()
    })

    it('should asArray', () => {
        let result = cs.get(asArray())
        expect(result).toStrictEqual([16, 4, 64, 36])
    })

    it('should every', () => {
        let result = cs.get(every((i) => typeof i === 'number'))
        expect(result).toStrictEqual(true)
    })

    it('should count all', () => {
        let result = cs.get(count())
        expect(result).toStrictEqual(4)
    })

    it('should head', () => {
        let result = cs.get(head())
        expect(result).toStrictEqual(16)
    })

    it('should last', () => {
        let result = cs.get(last())
        expect(result).toStrictEqual(36)
    })

    it('should max', () => {
        let result = cs.get(max())
        expect(result).toStrictEqual(64)
    })

    it('should min', () => {
        let result = cs.get(min())
        expect(result).toStrictEqual(4)
    })

    it('should sum number', () => {
        let result = cs.get(sum())
        expect(result).toStrictEqual(120)
    })

    it('should iterate', () => {
        let result: number[] = []
        for (let item of cs) {
            result.push(item)
        }
        expect(result).toStrictEqual([16, 4, 64, 36])
    })
})
