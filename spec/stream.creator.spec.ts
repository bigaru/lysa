import { describe, expect, it } from 'bun:test'
import { asArray, use, range } from '../src/index.js'

describe('use', () => {
    it('accepts array', () => {
        let result = use(['Lorem', 'ipsum', 'dolor', 'sit', 'amet']).complete(asArray())
        expect(result).toStrictEqual(['Lorem', 'ipsum', 'dolor', 'sit', 'amet'])
    })

    it('accepts string', () => {
        let result = use('Lorem ipsum').complete(asArray())
        expect(result).toStrictEqual(['L', 'o', 'r', 'e', 'm', ' ', 'i', 'p', 's', 'u', 'm'])
    })

    it('accepts object', () => {
        let result = use({ lorem: 'ipsum', dolor: 'sit', amet: 'consetetur' }).complete(asArray())
        expect(result).toStrictEqual([
            ['lorem', 'ipsum'],
            ['dolor', 'sit'],
            ['amet', 'consetetur'],
        ])
    })

    it('throw error in case of null/undefined', () => {
        expect(() => {
            use(null as any).complete(asArray())
        }).toThrow(Error)
    })
})

describe('range', () => {
    it('with stop', () => {
        let result = range(5).complete(asArray())
        expect(result).toStrictEqual([0, 1, 2, 3, 4])
    })

    it('with start, stop', () => {
        let result = range(5, 11).complete(asArray())
        expect(result).toStrictEqual([5, 6, 7, 8, 9, 10])
    })

    it('with start, stop, step', () => {
        let result = range(1, 9, 3).complete(asArray())
        expect(result).toStrictEqual([1, 4, 7])
    })

    it('with start, stop, invalid step', () => {
        let result = range(9, 1, 3).complete(asArray())
        expect(result).toStrictEqual([])
    })
})
