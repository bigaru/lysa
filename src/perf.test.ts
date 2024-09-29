import { run, bench, group } from 'mitata'
import { use, filter, map, asArray } from './index'
//@ts-ignore
import _ from 'lodash'

const LEN = 100_000

group('group', () => {
    bench('Lysa', () => {
        const arr = [...Array(LEN).keys()]
        let res = use(arr)
            .perform(
                map((i) => '#'.repeat(i)),
                map((i) => '-' + i + '-'),
                filter((i) => i.length % 7 === 0),
                map((i) => '-' + i + '444'),
                map((i) => i.length),
                filter((i) => i % 2 === 0)
            )
            .complete(asArray)
        //console.log('>', res.length)
    })
    bench('Lodash Chain', () => {
        const arr = [...Array(LEN).keys()]

        let res = _(arr)
            .chain()
            .map((i) => '#'.repeat(i))
            .map((i) => '-' + i + '-')
            .filter((i) => i.length % 7 === 0)
            .map((i) => '-' + i + '444')
            .map((i) => i.length)
            .filter((i) => i % 2 === 0)
            .value()
        //console.log('>', res.length)
    })
})

await run({ units: true } as any)
