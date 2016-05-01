'use strict';
var dotProp = require('dot-prop');
var arrify = require('arrify');
var dotPropGet = dotProp.get;

module.exports = function (arr, prop) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr.slice().sort(function (a, b) {
		var ret = 0;

		arrify(prop).some(function (el) {
			var x;
			var y;
			var desc;

			if (typeof el === 'function') {
				x = el(a);
				y = el(b);
			} else if (typeof el === 'string') {
				desc = el.charAt(0) === '-';
				el = desc ? el.slice(1) : el;
				x = dotPropGet(a, el);
				y = dotPropGet(b, el);
			} else {
				x = a;
				y = b;
			}

			if (x === y) {
				ret = 0;
				return false;
			}

			if (typeof x === 'string' && typeof y === 'string') {
				ret = desc ? y.localeCompare(x) : x.localeCompare(y);
				return ret !== 0;
			}

			if (desc) {
				ret = x < y ? 1 : -1;
			} else {
				ret = x < y ? -1 : 1;
			}

			return true;
		});

		return ret;
	});
};
