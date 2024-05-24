import { expect, test } from 'bun:test'
import { use } from './index.js'

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

test('mix: filter, map', () => {
    const arr = [...Array(10).keys()]
    let newArr = use(arr)
        .filter((i) => i % 2 === 0)
        .map((i) => '#' + i)
        .toArray()

    expect(newArr).toStrictEqual(['#0', '#2', '#4', '#6', '#8'])
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
