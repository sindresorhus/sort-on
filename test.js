import test from 'ava';
import fn from './';

test(t => {
	t.is(fn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], 'foo')[0].foo, 'a');

	t.is(fn([
		{foo: 2},
		{foo: 1},
		{foo: 3}
	], 'foo')[0].foo, 1);

	t.is(fn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'}
	], ['foo', 'bar'])[0].bar, 'a');

	t.is(fn([
		{foo: {bar: 'b'}},
		{foo: {bar: 'a'}},
		{foo: {bar: 'c'}}
	], 'foo.bar')[0].foo.bar, 'a');

	t.is(fn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], prop => prop.foo)[0].foo, 'a');

	t.is(fn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'}
	], [
		prop => prop.foo,
		prop => prop.bar
	])[0].bar, 'a');

	t.is(fn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'c'},
		{foo: 'c', bar: 'c'}
	], [
		prop => prop.foo,
		prop => prop.bar
	])[0].bar, 'b');

	t.is(fn([
		{foo: 2, bar: 2},
		{foo: 1, bar: 2},
		{foo: 1, bar: 1},
		{foo: 3, bar: 3}
	], [
		prop => prop.foo,
		prop => prop.bar
	])[0].bar, 1);

	t.is(fn([
		{foo: 2, bar: 1},
		{foo: 1, bar: 2},
		{foo: 1, bar: 3},
		{foo: 3, bar: 3}
	], [
		prop => prop.foo,
		prop => prop.bar
	])[0].bar, 2);

	const sorted = fn([
		{bar: 'b'},
		{foo: 'b'},
		{foo: 'a'}
	], 'foo');

	// {bar: 'b'} is not sorted so it might be the first or the second element
	t.is(sorted[0].foo || sorted[1].foo, 'a');

	t.is(fn([
		{foo: 'b', bar: 'a'},
		{foo: 'a', bar: 'c'},
		{foo: 'a', bar: 'b'},
		{foo: 'c', bar: 'c'}
	], ['foo', 'bar'])[0].bar, 'b');

	t.is(fn([
		{foo: 'b'},
		{foo: 'a'},
		{foo: 'c'}
	], '-foo')[0].foo, 'c');

	t.is(fn([
		{foo: 'b', bar: 'b'},
		{foo: 'a', bar: 'b'},
		{foo: 'a', bar: 'a'},
		{foo: 'c', bar: 'c'}
	], ['foo', '-bar'])[0].bar, 'b');

	t.is(fn([
		{foo: {bar: 'b'}},
		{foo: {bar: 'a'}},
		{foo: {bar: 'c'}}
	], '-foo.bar')[0].foo.bar, 'c');

	t.is(fn([
		{foo: {bar: 2}},
		{foo: {bar: 1}},
		{foo: {bar: 3}}
	], '-foo.bar')[0].foo.bar, 3);
});
