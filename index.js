'use strict';
const dotProp = require('dot-prop');
const arrify = require('arrify');

const dotPropGet = dotProp.get;

module.exports = (array, property) => {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected type \`Array\`, got \`${typeof array}\``);
	}

	return array.slice().sort((a, b) => {
		let returnValue = 0;

		arrify(property).some(element => {
			let isDescending;
			let x;
			let y;

			if (typeof element === 'function') {
				x = element(a);
				y = element(b);
			} else if (typeof element === 'string') {
				isDescending = element.charAt(0) === '-';
				element = isDescending ? element.slice(1) : element;
				x = dotPropGet(a, element);
				y = dotPropGet(b, element);
			} else {
				x = a;
				y = b;
			}

			if (x === y) {
				returnValue = 0;
				return false;
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
				returnValue = isDescending ? y.localeCompare(x) : x.localeCompare(y);
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
};
