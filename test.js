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

	t.assert(sortOn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'c'},
		{foo: 'c', bar: 'c'}
	], [
		function (prop) {
			return prop.foo;
		},
		function (prop) {
			return prop.bar;
		}
	])[0].bar === 'b');

	t.assert(sortOn([
		{foo: 2, bar: 2},
		{foo: 1, bar: 2},
		{foo: 1, bar: 1},
		{foo: 3, bar: 3}
	], [
		function (prop) {
			return prop.foo;
		},
		function (prop) {
			return prop.bar;
		}
	])[0].bar === 1);

	t.assert(sortOn([
		{foo: 2, bar: 1},
		{foo: 1, bar: 2},
		{foo: 1, bar: 3},
		{foo: 3, bar: 3}
	], [
		function (prop) {
			return prop.foo;
		},
		function (prop) {
			return prop.bar;
		}
	])[0].bar === 2);

	var sorted = sortOn([
		{bar: 'b'},
		{foo: 'b'},
		{foo: 'a'}
	], 'foo');

	// {bar: 'b'} is not sorted so it might be the first or the second element
	t.assert(sorted[0].foo || sorted[1].foo === 'a');

	t.assert(sortOn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'c'},
		{foo: 'a', bar: 'b'},
		{foo: 'c', bar: 'c'}
	], ['foo', 'bar'])[0].bar === 'b');

	t.end();
});
