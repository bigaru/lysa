import { expect, test } from 'bun:test'
import { use, filter, map, asArray, forEach } from './index.js'

test('array should filter', () => {
    let result = use([1, 2, 3, 4])
        .perform(filter((i) => i % 2 === 0))
        .complete(asArray())

    expect(result).toStrictEqual([2, 4])
})

test('array should map', () => {
    let result = use([1, 2, 3, 4])
        .perform(map((i) => i * i))
        .complete(asArray())

    expect(result).toStrictEqual([1, 4, 9, 16])
})

test('array should forEach', () => {
    let result: any = []
    use([1, 2, 3, 4]).complete(forEach((i) => result.push(i)))

    expect(result).toStrictEqual([1, 2, 3, 4])
})

test('array should asArray', () => {
    let result = use([1, 2, 3, 4]).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4])
})
