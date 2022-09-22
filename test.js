import process from 'node:process';
import test from 'ava';
import sortOn from './index.js';

test('main', t => {
	t.is(sortOn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'},
	], 'foo')[0].foo, 'a');

	t.is(sortOn([
		{foo: 2},
		{foo: 1},
		{foo: 3},
	], 'foo')[0].foo, 1);

	t.is(sortOn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'},
	], ['foo', 'bar'])[0].bar, 'a');

	t.is(sortOn([
		{foo: {bar: 'b'}},
		{foo: {bar: 'a'}},
		{foo: {bar: 'c'}},
	], 'foo.bar')[0].foo.bar, 'a');

	t.is(sortOn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'},
	], property => property.foo)[0].foo, 'a');

	t.is(sortOn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'},
	], [
		property => property.foo,
		property => property.bar,
	])[0].bar, 'a');

	t.is(sortOn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'c'},
		{foo: 'c', bar: 'c'},
	], [
		property => property.foo,
		property => property.bar,
	])[0].bar, 'b');

	t.is(sortOn([
		{foo: 2, bar: 2},
		{foo: 1, bar: 2},
		{foo: 1, bar: 1},
		{foo: 3, bar: 3},
	], [
		property => property.foo,
		property => property.bar,
	])[0].bar, 1);

	t.is(sortOn([
		{foo: 2, bar: 1},
		{foo: 1, bar: 2},
		{foo: 1, bar: 3},
		{foo: 3, bar: 3},
	], [
		property => property.foo,
		property => property.bar,
	])[0].bar, 2);

	t.is(sortOn([
		{foo: 2, bar: 1},
		{foo: 1, bar: 2},
		{foo: 1, bar: 3},
		{foo: 3, bar: 3},
	], [
		property => property.foo,
		'bar',
	])[0].bar, 2);

	const sorted = sortOn([
		{bar: 'b'},
		{foo: 'b'},
		{foo: 'a'},
	], 'foo');

	// {bar: 'b'} is not sorted so it might be the first or the second element
	t.is(sorted[0].foo || sorted[1].foo, 'a');

	t.is(sortOn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'c'},
		{foo: 'a', bar: 'b'},
		{foo: 'c', bar: 'c'},
	], ['foo', 'bar'])[0].bar, 'b');

	t.is(sortOn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'},
	], '-foo')[0].foo, 'c');

	t.is(sortOn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'},
	], ['foo', '-bar'])[0].bar, 'b');

	t.is(sortOn([
		{foo: {bar: 'b'}},
		{foo: {bar: 'a'}},
		{foo: {bar: 'c'}},
	], '-foo.bar')[0].foo.bar, 'c');

	t.is(sortOn([
		{foo: {bar: 2}},
		{foo: {bar: 1}},
		{foo: {bar: 3}},
	], '-foo.bar')[0].foo.bar, 3);

	t.is(sortOn([
		{foo: 'a'},
		{foo: null},
		{foo: 'b'},
	], 'foo')[2].foo, null);

	t.is(sortOn([
		{foo: 'a'},
		{foo: null},
		{foo: 'b'},
	], '-foo')[0].foo, null);

	t.is(sortOn([
		{foo: 'a'},
		{foo: ''},
		{foo: 'b'},
	], 'foo')[2].foo, '');

	t.is(sortOn([
		{foo: 'a'},
		{foo: ''},
		{foo: 'b'},
	], '-foo')[0].foo, '');

	t.is(sortOn([
		{foo: 1},
		{foo: 0},
		{foo: 2},
	], 'foo')[0].foo, 0);

	// Node v12 doesn't ship with full Intl support
	if (!process.version.startsWith('v12.')) {
		t.deepEqual(sortOn([
			{foo: 'g'},
			{foo: 'ä'},
			{foo: 'x'},
			{foo: 'a'},
		], 'foo', {locales: 'sv-SE'}), [
			{foo: 'a'},
			{foo: 'g'},
			{foo: 'x'},
			{foo: 'ä'},
		]);
	}

	t.deepEqual(sortOn([
		{foo: 'a1'},
		{foo: 'a10'},
		{foo: 'a11'},
		{foo: 'a2'},
		{foo: 'a25'},
		{foo: 'a3'},
	], 'foo', {localeOptions: {numeric: true}}), [
		{foo: 'a1'},
		{foo: 'a2'},
		{foo: 'a3'},
		{foo: 'a10'},
		{foo: 'a11'},
		{foo: 'a25'},
	]);
});
