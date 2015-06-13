'use strict';
var dotProp = require('dot-prop');
var dotPropGet = dotProp.get;

module.exports = function (arr, prop) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr.slice().sort(function (a, b) {
		var ret = 0;

		(Array.isArray(prop) ? prop : [prop]).some(function (el) {
			var x;
			var y;

			if (typeof el === 'function') {
				x = el(a);
				y = el(b);
			} else if (typeof el === 'string') {
				x = dotPropGet(a, el);
				y = dotPropGet(b, el);
			} else {
				x = a;
				y = b;
			}

			if (typeof x === 'string' && typeof y === 'string') {
				ret = x.localeCompare(y);
				if (ret !== 0) {
					return true;
				}
			}

			if (x === y) {
				ret = 0;
			} else if (x < y) {
				ret = -1;
				return true;
			} else if (x > y) {
				ret = 1;
				return true;
			}
		});

		return ret;
	});
};
