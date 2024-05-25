import { expect, test } from 'bun:test'
import { use } from './index.js'

test('chunk', () => {
    const arr = [...Array(10).keys()]
    let newArr = use(arr).chunk(3).toArray()

    expect(newArr).toStrictEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
})

test('chunk: non-positive size throws error', () => {
    expect(() => {
        use([]).chunk(0).toArray()
    }).toThrow('size must be positive')
})

test('compact', () => {
    const arr = [1, null, undefined, 0, 'foo', '']
    let newArr = use(arr).compact().toArray()

    expect(newArr).toStrictEqual([1, 'foo'])
})

test('concat', () => {
    const arr = [1, 2, 3]
    let newArr = use(arr)
        .concat([4, 5], [6, 7], new Set([8, 9, 10]))
        .toArray()

    expect(newArr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('concat empty argument', () => {
    const arr = [1, 2, 3]
    let newArr = use(arr).concat().toArray()

    expect(newArr).toStrictEqual([1, 2, 3])
})

test('filter', () => {
    const arr = [...Array(10).keys()]
    let newArr = use(arr)
        .filter((i) => i % 2 === 0)
        .toArray()

    expect(newArr).toStrictEqual([0, 2, 4, 6, 8])
})

test('map', () => {
    const arr = [...Array(5).keys()]
    let newArr = use(arr)
        .map((i) => '#' + i)
        .toArray()

    expect(newArr).toStrictEqual(['#0', '#1', '#2', '#3', '#4'])
})

test('forEach', () => {
    const arr = [...Array(5).keys()]
    let newArr: any = []

    use(arr).forEach((i) => {
        newArr.push(i)
    })

    expect(newArr).toStrictEqual([0, 1, 2, 3, 4])
})

test('spread into array', () => {
    const arr = [...Array(10).keys()]
    let newArr = use(arr)
        .filter((i) => i % 2 === 0)
        .map((i) => '#' + i)

    expect([...newArr]).toStrictEqual(['#0', '#2', '#4', '#6', '#8'])
})

test('mutliple: filter, map', () => {
    const arr = [...Array(10).keys()]
    let newArr = use(arr)
        .filter((i) => i % 2 === 0)
        .map((i) => '#' + i)
        .toArray()

    expect(newArr).toStrictEqual(['#0', '#2', '#4', '#6', '#8'])
})
