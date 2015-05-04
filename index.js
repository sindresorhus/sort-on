'use strict';
var compareFunc = require('compare-func');

module.exports = function (arr, prop) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	arr = arr.slice();

	arr.sort(compareFunc(prop));

	return arr;
};
