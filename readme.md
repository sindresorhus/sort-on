# sort-on [![Build Status](https://travis-ci.org/sindresorhus/sort-on.svg?branch=master)](https://travis-ci.org/sindresorhus/sort-on)

> Sort an array on an object property


## Install

```
$ npm install --save sort-on
```


## Usage

```js
var sortOn = require('sort-on');

// sort by an object property
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x');
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]

// sort by a nested object property
sortOn([{x: {y: 'b'}}, {x: {y: 'a'}}], 'x.y');
//=> [{x: {y: 'a'}}, {x: {y: 'b'}}]

// sort by the `x` propery, then `y`
sortOn([{x: 'c', y: 'c'}, {x: 'b', y: 'a'}, {x: 'b', y: 'b'}], ['x', 'y']);
//=> [{x: 'b', y: 'a'}, {x: 'b', y: 'b'}, {x: 'c', y: 'c'}]

// sort by the returned value
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], function (el) {
	return el.x;
});
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]
```


## API

### sortOn(array, property)

Returns a new sorted array.

#### array

*Required*  
Type: `array`

#### property

*Required*  
Type: `string`, `function` or `array` of the former

The string can be a [dot path](https://github.com/sindresorhus/dot-prop) to a nested object property.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
