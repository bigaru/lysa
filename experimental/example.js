import { camelCase, chunk, kebabCase, snakeCase } from './index.js'
import { letLazy } from './lazy.js'

const text = 'foo bar'
console.log(text, text[camelCase](), text[kebabCase](), text[snakeCase]())

console.log(text[chunk](3))

const add = () => {}
const multiply = () => {}
const divide = () => {}

const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x)

//add(44)[pipe](multiply, multiply, divide)[pipe](divide)

//
// -----------
//

function sleep(seconds) {
    var e = new Date().getTime() + seconds * 1000
    while (new Date().getTime() <= e) {}
}

letLazy('hamsti', () => {
    sleep(3)
    console.log('####')
    return 'meowww'
})

class Soolong {
    moolong = 40

    constructor() {
        letLazy(
            'moo',
            () => {
                sleep(3)
                return ++this.moolong
            },
            this
        )
    }

    koo() {
        console.log('## ', this.moolong)
        return this.moo
    }
}

const s = new Soolong()

console.log('--->1')
console.log('-', s.koo())
console.log('--->2')
console.log('-', s.koo())
console.log('--->3')

console.log('--->1')
console.log('-', hamsti)
console.log('--->2')
console.log('-', hamsti)
console.log('--->3')
