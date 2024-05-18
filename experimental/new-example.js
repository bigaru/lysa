import { lazyInit } from '../dist/index.js'
import { BaseStream } from '../dist/stream.js'

function sleep(seconds) {
    var e = new Date().getTime() + seconds * 1000
    while (new Date().getTime() <= e) {}
}

lazyInit('supercat', () => {
    //sleep(3)
    console.log('####')
    return 'meowww...'
})

console.log('--->1')
console.log('-', supercat)
console.log('--->2')
console.log('-', supercat)
console.log('--->3')

const st = new BaseStream([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
st.filter((i) => i % 3 === 0)
    .map((i) => 'i' + i)
    .each((e) => console.log('-----', e))
