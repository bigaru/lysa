import { expect, test } from 'bun:test'
import { use, filter, map, asArray } from './index.js'

test('array filter', () => {
    let result = use([1, 2, 3, 4])
        .perform(filter((i) => i % 2 === 0))
        .complete(asArray)

    expect(result).toStrictEqual([2, 4])
})

test('array map', () => {
    let result = use([1, 2, 3, 4])
        .perform(map((i) => i * i))
        .complete(asArray)

    expect(result).toStrictEqual([1, 4, 9, 16])
})
