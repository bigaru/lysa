import { describe, expect, it } from 'bun:test'
import { asArray, every, count, forEach, use, find, findIndex, head, last, max, min, reduce, reduceRight, sum, some, asObject } from '../src/index.js'

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

    it('should asObject', () => {
        let result = use<[string, string]>([
            ['foo0', 'bar0'],
            ['foo1', 'bar1'],
            ['foo0', 'bad'],
        ]).complete(asObject())
        expect(result).toStrictEqual({ foo0: 'bad', foo1: 'bar1' })
    })

    it('should every', () => {
        let result = use([1, 2, 3, 4, 5]).complete(every((i) => typeof i === 'number'))
        expect(result).toStrictEqual(true)
    })

    it('should count all', () => {
        let result = use([1, 2, 3, 4, 5]).complete(count())
        expect(result).toStrictEqual(5)
    })

    it('should count number', () => {
        let result = use(['1', 2, '3', 4, true]).complete(count((i) => typeof i === 'number'))
        expect(result).toStrictEqual(2)
    })

    it('should some', () => {
        let result = use(['1', 2, '3', 4, true, 5]).complete(some((i) => typeof i === 'boolean'))
        expect(result).toStrictEqual(true)
    })

    it('should some if missing', () => {
        let result = use(['1', 2, '3', 4, 5]).complete(some((i) => typeof i === 'boolean'))
        expect(result).toStrictEqual(false)
    })

    it('should find', () => {
        let result = use([{ food: 1 }, { food: 2 }, { food: 3 }, { food: 4 }]).complete(find((i) => i.food === 3))
        expect(result).toStrictEqual({ food: 3 })
    })

    it('should find nothing', () => {
        let result = use([{ food: 1 }, { food: 2 }, { food: 3 }, { food: 4 }]).complete(find((i) => i.food === 33))
        expect(result).toBeUndefined()
    })

    it('should findIndex', () => {
        let result = use([{ food: 1 }, { food: 2 }, { food: 3 }, { food: 4 }]).complete(findIndex((i) => i.food === 3))
        expect(result).toStrictEqual(2)
    })

    it('should head', () => {
        let result = use([31, 42, 53, 23]).complete(head())
        expect(result).toStrictEqual(31)
    })

    it('should head empty', () => {
        let result = use([] as number[]).complete(head())
        expect(result).toBeUndefined()
    })

    it('should last', () => {
        let result = use([31, 42, 53, 23]).complete(last())
        expect(result).toStrictEqual(23)
    })

    it('should last empty', () => {
        let result = use([] as number[]).complete(last())
        expect(result).toBeUndefined()
    })

    it('should max', () => {
        let result = use([4, 5, 8, 1, 3]).complete(max())
        expect(result).toStrictEqual(8)
    })

    it('should max with comperator', () => {
        let result = use([4, 5, 8, 1, 3]).complete(max((a, b) => b - a))
        expect(result).toStrictEqual(1)
    })

    it('should min', () => {
        let result = use([4, 5, 8, 1, 3]).complete(min())
        expect(result).toStrictEqual(1)
    })

    it('should min with comperator', () => {
        let result = use([4, 5, 8, 1, 3]).complete(min((a, b) => b - a))
        expect(result).toStrictEqual(8)
    })

    it('should reduce', () => {
        let result = use(['hel', 'lo', ' wor', 'ld']).complete(reduce((acc, val) => acc + val))
        expect(result).toStrictEqual('hello world')
    })

    it('should reduce with seed', () => {
        let result = use(['hello', 'world']).complete(reduce((acc, val) => acc + val.length, 100))
        expect(result).toStrictEqual(110)
    })

    it('should reduceRight', () => {
        let result = use(['hel', 'lo', ' wor', 'ld']).complete(reduceRight((acc, val) => acc + val))
        expect(result).toStrictEqual('ld worlohel')
    })

    it('should reduceRight with seed', () => {
        let result = use(['hello', 'world']).complete(reduceRight((acc, val) => acc - val.length, 100))
        expect(result).toStrictEqual(90)
    })

    it('should sum string', () => {
        let result = use(['hel', 'lo', ' wor', 'ld']).complete(sum())
        expect(result).toStrictEqual('hello world')
    })

    it('should sum number', () => {
        let result = use([1, 2, 3, 4, 5]).complete(sum())
        expect(result).toStrictEqual(15)
    })
})
