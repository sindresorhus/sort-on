import {getProperty} from 'dot-prop';

function convertNumericStrings(x, y) {
	const isXNumeric = typeof x === 'string' && x.trim() !== '' && !Number.isNaN(Number(x));
	const isYNumeric = typeof y === 'string' && y.trim() !== '' && !Number.isNaN(Number(y));

	if (isXNumeric && isYNumeric) {
		return [Number(x), Number(y)];
	}

	return [x, y];
}

function compareBooleans(x, y, isDescending) {
	if (typeof x === 'boolean' && typeof y === 'boolean') {
		if (x === y) {
			return 0;
		}

		// False should come before true in ascending. For descending, reverse it.
		return isDescending ? (x < y ? 1 : -1) : (x < y ? -1 : 1);
	}

	return null;
}

function compareStrings(x, y, isDescending, options = {}) {
	const {locales, localeOptions} = options;

	if (typeof x === 'string' && typeof y === 'string') {
		return isDescending
			? y.localeCompare(x, locales, localeOptions)
			: x.localeCompare(y, locales, localeOptions);
	}

	return null; // Indicates not both are strings
}

// Modified logic for null/undefined
function compareValues(x, y, isDescending) {
	if (x === y) {
		return 0;
	}

	// If y is null/undefined but x is not:
	// Ascending: null should appear at the end, so x < y means return -1
	// Descending: null should appear at the start, so x > y means return 1
	if (y !== 0 && !y) {
		return isDescending ? 1 : -1;
	}

	// If x is null/undefined but y is not:
	// Ascending: null at the end means x > y, so return 1
	// Descending: null at the start means x < y, so return -1
	if (x !== 0 && !x) {
		return isDescending ? -1 : 1;
	}

	// Normal comparison for non-null values
	return isDescending ? (x < y ? 1 : -1) : (x < y ? -1 : 1);
}

export default function sortOn(array, property, {locales, localeOptions} = {}) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected type 'Array', got '${typeof array}'`);
	}

	return [...array].sort((a, b) => {
		let returnValue = 0;

		[property].flat().some(element => {
			let isDescending = false;
			let x;
			let y;

			if (typeof element === 'function') {
				x = element(a);
				y = element(b);
			} else if (typeof element === 'string') {
				isDescending = element.charAt(0) === '-';
				element = isDescending ? element.slice(1) : element;
				x = getProperty(a, element);
				y = getProperty(b, element);
			} else {
				x = a;
				y = b;
			}

			[x, y] = convertNumericStrings(x, y);

			const booleanComparison = compareBooleans(x, y, isDescending);
			if (booleanComparison !== null) {
				returnValue = booleanComparison;
				return booleanComparison !== 0;
			}

			if (returnValue === 0) {
				const stringComparison = compareStrings(x, y, isDescending, {locales, localeOptions});
				if (stringComparison !== null) {
					returnValue = stringComparison;
				}
			}

			if (returnValue === 0) {
				returnValue = compareValues(x, y, isDescending);
			}

			return returnValue !== 0;
		});

		return returnValue;
	});
}
