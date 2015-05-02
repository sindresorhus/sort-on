'use strict';
var dotPropGet = require('dot-prop').get;

module.exports = function (arr, prop) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	arr = arr.slice();

	(Array.isArray(prop) ? prop : [prop]).forEach(function (el) {
		arr.sort(function (a, b) {
			if (typeof el === 'function') {
				a = el(a);
				b = el(b);
			}

			if (typeof el === 'string') {
				a = dotPropGet(a, el);
				b = dotPropGet(b, el);
			}

			if (typeof a === 'string' && typeof b === 'string') {
				return a.localeCompare(b);
			}

			if (a === b) {
				return 0;
			}

			return a < b ? -1 : 1;
		});
	});

	return arr;
};
