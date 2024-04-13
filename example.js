import { camelCase, kebabCase, snakeCase } from './string/index.js'

const text = 'foo bar'
console.log(text, text[camelCase], text[kebabCase], text[snakeCase])
