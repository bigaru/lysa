import { run, bench, group, baseline } from 'mitata'
import { use } from '.'
import { ArrayStream, List, filter, map, ArrayCreator } from './list'
//@ts-ignore
import _ from 'lodash'

const LEN = 100_000

group('group', () => {
    bench('Lysa', () => {
        const arr = [...Array(LEN).keys()]
        let res = use(arr)
            .map((i) => '#'.repeat(i))
            .map((i) => '-' + i + '-')
            .filter((i) => i.length % 7 === 0)
            .map((i) => '-' + i + '444')
            .map((i) => i.length)
            .filter((i) => i % 2 === 0)
            .toArray()
        console.log('>', res.length)
    })
    bench('Lysa new', () => {
        const arr = [...Array(LEN).keys()]
        let res = new List(arr)
            .map((i) => '#'.repeat(i))
            .map((i) => '-' + i + '-')
            .filter((i) => i.length % 7 === 0)
            .map((i) => '-' + i + '444')
            .map((i) => i.length)
            .filter((i) => i % 2 === 0)
            .toArray()
        console.log('>', res.length)
    })
    bench('Lysa new2', () => {
        const arr = [...Array(LEN).keys()]
        let res = new List(arr)
            .map((i) => '#'.repeat(i))
            .map((i) => '-' + i + '-')
            .filter((i) => i.length % 7 === 0)
            .map((i) => '-' + i + '444')
            .map((i) => i.length)
            .filter((i) => i % 2 === 0)
            .toArray2()
        console.log('>', res.length)
    })
    bench('Lysa stream', () => {
        const arr = [...Array(LEN).keys()]
        let res = new ArrayStream(arr, [])
            .pipe(
                map((i) => '#'.repeat(i)),
                map((i) => '-' + i + '-'),
                filter((i) => i.length % 7 === 0),
                map((i) => '-' + i + '444'),
                map((i) => i.length),
                filter((i) => i % 2 === 0)
            )
            .as(ArrayCreator)
        console.log('>', res.length)
    })
    bench('Lodash Chain', () => {
        const arr = [...Array(LEN).keys()]
        let res = _.chain(arr)
            .map((i) => '#'.repeat(i))
            .map((i) => '-' + i + '-')
            .filter((i) => i.length % 7 === 0)
            .map((i) => '-' + i + '444')
            .map((i) => i.length)
            .filter((i) => i % 2 === 0)
            .value()
        console.log('>', res.length)
    })
})

await run({ units: true } as any)
