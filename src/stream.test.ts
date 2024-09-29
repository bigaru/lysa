import { expect, test } from 'bun:test'
import { use, filter, map, asArray, forEach, distinct, take, takeRight, takeWhile, drop, dropRight, dropWhile } from './index.js'

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

test('array should distinct', () => {
    let result = use([1, 2, 3, 2, 4, 5, 3, 4]).perform(distinct()).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('array should take', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(take(5)).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('array should takeRight', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(takeRight(5)).complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})

test('array should takeWhile', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .perform(takeWhile((i) => i <= 5))
        .complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('array should drop', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(drop(5)).complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})

test('array should dropRight', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(dropRight(5)).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('array should dropWhile', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .perform(dropWhile((i) => i <= 5))
        .complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})
