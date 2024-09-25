import { List } from './list'

const arr = [...Array(20).keys()]
let a = new List(arr)
    .filter((i) => {
        console.log('filtered' + i)
        return i % 3 === 0
    })
    .map((i) => {
        console.log('mapped' + i)
        return '#' + i
    })

console.log('<----->')
a.toArray()
//console.log('-->', a)

const arr1 = [...Array(200000).keys()]
let res = new List(arr1)
    .filter((i) => i % 3 === 0)
    .filter((i) => i % 2 === 0)
    .map((i) => '#' + i)
    .toArray()
console.log(res)
