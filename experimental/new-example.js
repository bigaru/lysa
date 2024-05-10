import { lazyInit } from '../dist/index.js'

function sleep(seconds) {
    var e = new Date().getTime() + seconds * 1000
    while (new Date().getTime() <= e) {}
}

lazyInit('supercat', () => {
    sleep(3)
    console.log('####')
    return 'meowww...'
})

console.log('--->1')
console.log('-', supercat)
console.log('--->2')
console.log('-', supercat)
console.log('--->3')
