import _camelCase from 'lodash/camelCase.js'
import _chunk from 'lodash/chunk.js'
import _kebabCase from 'lodash/kebabCase.js'
import _snakeCase from 'lodash/snakeCase.js'
import { camelCase, chunk, drop, head, kebabCase, last, reverse, snakeCase, tail, take } from './symbols.js'

const target = String.prototype

target[chunk] = function (n) {
    return _chunk([...this], n).map((chk) => chk.join(''))
}
target[drop] = function (n) {
    return this?.slice(n)
}
target[take] = function (n) {
    return this?.slice(0, n)
}
target[head] = function () {
    return this?.[0]
}
target[last] = function () {
    return this?.[this.length - 1]
}
target[tail] = function () {
    return this?.slice(1)
}
target[reverse] = function () {
    return [...this].reverse().join('')
}

target[camelCase] = function () {
    return _camelCase(this)
}
target[kebabCase] = function () {
    return _kebabCase(this)
}
target[snakeCase] = function () {
    return _snakeCase(this)
}
