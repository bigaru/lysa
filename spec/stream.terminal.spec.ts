import { describe, expect, it } from 'bun:test'
import { asArray, every, count, forEach, use, find, findIndex } from '../src/index.js'

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

    it('should count all', () => {
        let result = use([1, 2, 3, 4, 5]).complete(count())
        expect(result).toStrictEqual(5)
    })

    it('should count number', () => {
        let result = use(['1', 2, '3', 4, true]).complete(count((i) => typeof i === 'number'))
        expect(result).toStrictEqual(2)
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
})
