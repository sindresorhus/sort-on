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
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], 'foo')[0].foo === 'a');

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
		{bar: 'b'},
		{foo: 'b'},
		{foo: 'a'}
	], 'foo')[0].foo === 'a');

	t.end();
});
