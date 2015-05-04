'use strict';
var test = require('ava');
var sortOn = require('./');

test(function (t) {
	t.assert(sortOn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], 'foo')[0].foo === 'a');

	t.assert(sortOn([
		{foo: 2},
		{foo: 1},
		{foo: 3}
	], 'foo')[0].foo === 1);

	t.assert(sortOn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'}
	], ['foo', 'bar'])[0].bar === 'a');

	t.assert(sortOn([
		{foo: {bar: 'b'}},
		{foo: {bar: 'a'}},
		{foo: {bar: 'c'}}
	], 'foo.bar')[0].foo.bar === 'a');

	t.assert(sortOn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], function (prop) {
		return prop.foo;
	})[0].foo === 'a');

	t.assert(sortOn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'}
	], [
		function (prop) {
			return prop.foo;
		},
		function (prop) {
			return prop.bar;
		}
	])[0].bar === 'a');

	var arr = sortOn([
		{bar: 'b'},
		{foo: 'b'},
		{foo: 'a'}
	], 'foo');

	arr.some(function (el) {
		var foo = el.foo;
		if (foo) {
			t.assert(foo === 'a');
			return true;
		}
	});

	t.assert(sortOn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'c'},
		{foo: 'a', bar: 'b'},
		{foo: 'c', bar: 'c'}
	], ['foo', 'bar'])[0].bar === 'b');

	t.end();
});
