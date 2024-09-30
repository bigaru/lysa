import { expect, test } from 'bun:test'
import { use, filter, map, asArray, forEach, distinct, take, takeRight, takeWhile, drop, dropRight, dropWhile, chunk, compact, concat, range } from './index.js'

test('stream accepts array', () => {
    let result = use(['Lorem', 'ipsum', 'dolor', 'sit', 'amet']).complete(asArray())
    expect(result).toStrictEqual(['Lorem', 'ipsum', 'dolor', 'sit', 'amet'])
})

test('stream accepts string', () => {
    let result = use('Lorem ipsum').complete(asArray())
    expect(result).toStrictEqual(['L', 'o', 'r', 'e', 'm', ' ', 'i', 'p', 's', 'u', 'm'])
})

test('stream accepts object', () => {
    let result = use({ lorem: 'ipsum', dolor: 'sit', amet: 'consetetur' }).complete(asArray())
    expect(result).toStrictEqual([
        ['lorem', 'ipsum'],
        ['dolor', 'sit'],
        ['amet', 'consetetur'],
    ])
})

test('stream throw error in case of null/undefined', () => {
    expect(() => {
        use(null as any).complete(asArray())
    }).toThrow(Error)
})

test('range with stop', () => {
    let result = range(5).complete(asArray())
    expect(result).toStrictEqual([0, 1, 2, 3, 4])
})

test('range with start, stop', () => {
    let result = range(5, 11).complete(asArray())
    expect(result).toStrictEqual([5, 6, 7, 8, 9, 10])
})

test('range with start, stop, step', () => {
    let result = range(1, 9, 3).complete(asArray())
    expect(result).toStrictEqual([1, 4, 7])
})

test('range with start, stop, invalid step', () => {
    let result = range(9, 1, 3).complete(asArray())
    expect(result).toStrictEqual([])
})

test('stream should filter', () => {
    let result = use([1, 2, 3, 4])
        .perform(filter((i) => i % 2 === 0))
        .complete(asArray())

    expect(result).toStrictEqual([2, 4])
})

test('stream should map', () => {
    let result = use([1, 2, 3, 4])
        .perform(map((i) => i * i))
        .complete(asArray())

    expect(result).toStrictEqual([1, 4, 9, 16])
})

test('stream should forEach', () => {
    let result: any = []
    use([1, 2, 3, 4]).complete(forEach((i) => result.push(i)))

    expect(result).toStrictEqual([1, 2, 3, 4])
})

test('stream should asArray', () => {
    let result = use([1, 2, 3, 4]).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4])
})

test('stream should distinct', () => {
    let result = use([1, 2, 3, 2, 4, 5, 3, 4]).perform(distinct()).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('stream should take', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(take(5)).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('stream should takeRight', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(takeRight(5)).complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})

test('stream should takeWhile', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .perform(takeWhile((i) => i <= 5))
        .complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('stream should drop', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(drop(5)).complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})

test('stream should dropRight', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).perform(dropRight(5)).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
})

test('stream should dropWhile', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .perform(dropWhile((i) => i <= 5))
        .complete(asArray())

    expect(result).toStrictEqual([6, 7, 8, 9, 10])
})

test('stream should chunk', () => {
    let result = use([1, 2, 3, 4, 5, 6, 7, 8, 9]).perform(chunk(2)).complete(asArray())

    expect(result).toStrictEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
})

test('stream should compact', () => {
    let result = use([1, 0, 2, false, 3, '', 4]).perform(compact()).complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4])
})

test('stream should concat raw values', () => {
    let result = use([1, 2])
        .perform(concat([3, 4], [5, 6]))
        .complete(asArray())

    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6])
})

test('stream should concat stream values', () => {
    let second = use([1, 2]).perform(map((i) => i * 2))
    let third = use([2, 3]).perform(map((i) => i * 3))

    let result = use([1, 2]).perform(concat(second, third)).complete(asArray())

    expect(result).toStrictEqual([1, 2, 2, 4, 6, 9])
})
