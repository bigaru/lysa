import { camelCase, kebabCase, snakeCase } from './index.js'

const text = 'foo bar'
console.log(text, text[camelCase](), text[kebabCase](), text[snakeCase]())
