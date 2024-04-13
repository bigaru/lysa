import _camelCase from 'lodash/camelCase.js'
import _kebabCase from 'lodash/kebabCase.js'
import _snakeCase from 'lodash/snakeCase.js'
import { attach } from '../index.js'

const camelCase = attach(String.prototype, function camelCase() {
    return _camelCase(this)
})

const kebabCase = attach(String.prototype, function kebabCase() {
    return _kebabCase(this)
})

const snakeCase = attach(String.prototype, function snakeCase() {
    return _snakeCase(this)
})

export { camelCase, kebabCase, snakeCase }
