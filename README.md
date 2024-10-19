# Lysa

[![CI](https://github.com/bigaru/lysa/actions/workflows/ci.yml/badge.svg)](https://github.com/bigaru/lysa/actions/workflows/ci.yml) [![NPM Version](https://img.shields.io/npm/v/%40bigaru%2Flysa)](https://www.npmjs.com/package/@bigaru/lysa)

> 'lýsa' is Icelandic for 'describe'

Lysa is a practical utility library for TypeScript similar to [lazy.js](https://github.com/dtao/lazy.js). It is built on top of [RxJS](https://github.com/ReactiveX/rxjs).

With emphasis on:

* lazy evaluation
* simple and straightforward

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

### Operators

For `.perform()`, the following operators are supported:

```ts
chunk(size: number)
compact()
concat(...args: (Array<T> | Stream<T> | CompletedStream<T>)[])
difference(...args: Array<T>[], equalityFn? : (a,b) => boolean)
distinct(selector?: (value: A) => B)
drop(count: number)
dropRight(count: number)
dropWhile(predicate: (value: T, index) => boolean)
filter(predicate: (value: T, index) => boolean)
flatMap(project: (value: A, index) => B, recursive?: boolean)
flatten(recursive?: boolean)
intersection(...args: Array<T>[], equalityFn? : (a,b) => boolean)
map(project: (value: A, index) => B)
reverse()
sort(comparer?: (x: T, y: T) => number)
tail()
take(count: number)
takeRight(count: number)
takeWhile(predicate: (value, index) => boolean)
zip(...args: Array<T>[] | Stream<T>[] | CompletedStream<T>[])
```

### Terminal Operators

For `.complete()` or `.get()`, the following terminal operators are supported:

```ts
asArray()
asObject()
count()
every(predicate: (value: T, index) => boolean)
find(predicate: (value: T, index) => boolean)
findIndex(predicate: (value: T, index) => boolean)
forEach(callbackFn: (item: T) => void)
head()
last()
max(comparer?: (x: T, y: T) => number)
min(comparer?: (x: T, y: T) => number)
reduce(reduceFn: (acc: S, value: T, index) => S, seed?: S)
reduceRight(reduceFn: (acc: S, value: T, index) => S, seed?: S)
some(predicate: (value: T, index) => boolean)
sum()
```
