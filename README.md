# Lysa
[![CI](https://github.com/bigaru/lysa/actions/workflows/ci.yml/badge.svg)](https://github.com/bigaru/lysa/actions/workflows/ci.yml)

Lysa is an utility library for TypeScript similar to [lazy.js](https://github.com/dtao/lazy.js). It is built on top of [rxjs](https://github.com/ReactiveX/rxjs).

With emphasis on:
* lazy evaluation
* simple and straightforward

> 'lýsa' is Icelandic for 'describe'


## Examples

Carry out all operations in one iteration and only if needed.
```ts
let raw = use([1, 2, 3, 4])
            .perform(
                filter((i) => i % 2 === 0),
                map((i) => i * i)
            )

// It is not evaluated until 'complete' is called.
let newArray = raw.complete(asArray())
```

Reuse the intermediate result.
```ts
let intermediate = use([7, 4, 8, 10, 1, 2, 9, 5, 6, 3])
                    .perform(
                        filter((i) => i % 2 === 0),
                        map((i) => i * i)
                    )
                    .complete() // Do not pass any operator

let minValue = intermediate.get(min())
let lastValue = intermediate.get(last())
```


With `lazyInit` the variable will be initialized when it is accessed for the first time.
```ts
const expensiveFn = () => new Building()

declare const myBuilding: Building
lazyInit('myBuilding', expensiveFn) // Building not yet created
//...
let no = myBuilding.getNumberOfRooms() // now the Building is created
```

## Getting Started
Start with one of them:
`use(array)`, `use('string')`, `use(object)`, `range(end)`, `range(begin, end, step?)`

For `.perform()`, the following *operators* are supported:

`chunk`, `compact`, `concat`, `difference`, `distinct`, `drop`, `dropRight`, `dropWhile`, `filter`, `flatMap`, `flatten`, `intersection`, `map`, `reverse`, `sort`, `tail`, `take`, `takeRight`, `takeWhile`, `zip`

For `.complete()` or `.get()`, the following *terminal operators* are supported:

`asArray`, `asObject`, `count`, `every`, `find`, `findIndex`, `forEach`, `head`, `last`, `max`, `min`, `reduce`, `reduceRight`, `some`, `sum`
