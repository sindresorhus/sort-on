# sort-on

> Sort an array on an object property


## Install

```
$ npm install sort-on
```


## Usage

```js
const sortOn = require('sort-on');

// Sort by an object property
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x');
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]

// Sort descending by an object property
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], '-x');
//=> [{x: 'c'}, {x: 'b'}, {x: 'a'}]

// Sort by a nested object property
sortOn([{x: {y: 'b'}}, {x: {y: 'a'}}], 'x.y');
//=> [{x: {y: 'a'}}, {x: {y: 'b'}}]

// Sort descending by a nested object property
sortOn([{x: {y: 'b'}}, {x: {y: 'a'}}], '-x.y');
//=> [{x: {y: 'b'}, {x: {y: 'a'}}}]

// Sort by the `x` property, then `y`
sortOn([{x: 'c', y: 'c'}, {x: 'b', y: 'a'}, {x: 'b', y: 'b'}], ['x', 'y']);
//=> [{x: 'b', y: 'a'}, {x: 'b', y: 'b'}, {x: 'c', y: 'c'}]

// Sort by the returned value
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], el => el.x);
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]
```


## API

### sortOn(array, property)

Returns a new sorted version of the given array.

#### array

Type: `unknown[]`

The array to sort.

#### property

Type: `string | string[] | Function`

The string can be a [dot path](https://github.com/sindresorhus/dot-prop) to a nested object property. Prepend it with `-` to sort it in descending order.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
