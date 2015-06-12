'use strict';
var dotProp = require('dot-prop');
var dotPropGet = dotProp.get;

module.exports = function (arr, prop) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr.slice().sort(function (a, b) {
		var ret = 0;

		(Array.isArray(prop) ? prop : [prop]).forEach(function (el) {
			var x = a;
			var y = b;

			if (typeof el === 'function') {
				x = el(x);
				y = el(y);
			}

			if (typeof el === 'string') {
				x = dotPropGet(x, el);
				y = dotPropGet(y, el);
			}

			// lower priority for each prop
			ret++;

			if (x === y) {
				return;
			}

			if (typeof x === 'string' && typeof y === 'string') {
				ret += x.localeCompare(y);
				return;
			}

			ret += x < y ? -1 : 1;
		});

		return ret;
	});
};
