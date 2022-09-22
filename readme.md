# sort-on

> Sort an array on an object property

## Install

```sh
npm install sort-on
```

## Usage

```js
import sortOn from 'sort-on';

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
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], element => element.x);
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]
```

## API

### sortOn(array, property, options)

Returns a new sorted version of the given array.

#### array

Type: `unknown[]`

The array to sort.

#### property

Type: `string | string[] | Function`

The string can be a [dot path](https://github.com/sindresorhus/dot-prop) to a nested object property.

Prefix it with `-` to sort it in descending order.

#### options

Type: `object`

##### locales

Type: `string | string[]`

Locale(s) to use when sorting strings.

Should be a locale string or array of locale strings that contain one or more language or locale tags.

If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale.

If you omit this parameter, the default locale of the JavaScript runtime is used.

This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.

##### localeOptions

Type: `Intl.CollatorOptions`

An object that contains one or more properties that specify comparison options. see the [`Intl.Collator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator) object for details.
