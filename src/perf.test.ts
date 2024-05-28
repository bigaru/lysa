import { run, bench, group, baseline } from 'mitata'
import { use } from '.'
//@ts-ignore
import _ from 'lodash'

group('group', () => {
    bench('Lysa', () => {
        const arr = [...Array(200000).keys()]
        let res = use(arr)
            .filter((i) => i % 3 === 0)
            .filter((i) => i % 2 === 0)
            .map((i) => '#' + i)
            .toArray()
    })
    bench('Lodash', () => {
        const arr = [...Array(200000).keys()]
        let res = _.map(
            _.filter(
                _.filter(arr, (i) => i % 3 === 0),
                (i) => i % 2 === 0
            ),
            (i) => '#' + i
        )
    })
    bench('Lodash Chain', () => {
        const arr = [...Array(200000).keys()]

        let res = _(arr)
            .chain()
            .filter((i) => i % 3 === 0)
            .filter((i) => i % 2 === 0)
            .map((i) => '#' + i)
            .value()
    })
})

await run({ units: true } as any)
