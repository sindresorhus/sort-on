export type Property<T> = string | ((element: T) => unknown) | Array<string | ((element: T) => unknown)>;

export type Options = {
	/**
	One or more locales to use when sorting strings.

	Should be a locale string or array of locale strings that contain one or more language or locale tags.

	If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale.

	If you omit this parameter, the default locale of the JavaScript runtime is used.

	This parameter must conform to BCP 47 standards. See {@link Intl.Collator} for more details.
	*/
	readonly locales?: string | readonly string[];

	/**
	Comparison options.

	See {@link Intl.Collator} for more details.
	*/
	readonly localeOptions?: Intl.CollatorOptions;
};

/**
Sort an array on an object property.

@param array - The array to sort.
@param property - The string can be a [dot path](https://github.com/sindresorhus/dot-prop) to a nested object property. Prefix it with `-` to sort it in descending order.
@returns A new sorted version of the given array.

@example
```
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
//=> [{x: {y: 'b'}}, {x: {y: 'a'}}]

// Sort by the `x` property, then `y`
sortOn([{x: 'c', y: 'c'}, {x: 'b', y: 'a'}, {x: 'b', y: 'b'}], ['x', 'y']);
//=> [{x: 'b', y: 'a'}, {x: 'b', y: 'b'}, {x: 'c', y: 'c'}]

// Sort by the returned value
sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], element => element.x);
//=> [{x: 'a'}, {x: 'b'}, {x: 'c'}]
```
*/
export default function sortOn<T>(array: readonly T[], property: Property<T>, options?: Options): T[];
