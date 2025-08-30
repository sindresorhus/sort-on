import {getProperty} from 'dot-prop';

export default function sortOn(array, property, {locales, localeOptions} = {}) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected type \`Array\`, got \`${typeof array}\``);
	}

	return [...array].sort((a, b) => {
		let returnValue = 0;

		[property].flat().some(element => {
			let isDescending;
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

			if (x === y) {
				returnValue = 0;
				return false;
			}

			if (typeof x === 'bigint' && typeof y === 'bigint') {
				returnValue = isDescending ? (x < y ? 1 : -1) : (x < y ? -1 : 1);
				return returnValue !== 0;
			}

			if (y !== 0 && !y) {
				returnValue = isDescending ? 1 : -1;
				return true;
			}

			if (x !== 0 && !x) {
				returnValue = isDescending ? -1 : 1;
				return true;
			}

			if (typeof x === 'string' && typeof y === 'string') {
				returnValue = isDescending ? y.localeCompare(x, locales, localeOptions) : x.localeCompare(y, locales, localeOptions);
				return returnValue !== 0;
			}

			if (isDescending) {
				returnValue = x < y ? 1 : -1;
			} else {
				returnValue = x < y ? -1 : 1;
			}

			return true;
		});

		return returnValue;
	});
}
