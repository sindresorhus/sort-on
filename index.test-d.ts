import {expectType} from 'tsd';
import sortOn, {Property} from './index.js';

expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x')[0].x);
expectType<any>(sortOn<any>([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x')[0].x);

expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], ['x'])[0].x);
expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], element => element.x)[0].x);
expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], [element => element.x])[0].x);
expectType<string>(sortOn([{x: 'b', y: 1}, {x: 'a', y: 2}, {x: 'c', y: 1}], [element => element.x, 'y'])[0].x);

const property: Property<string> = string => string;
expectType<string>(sortOn(['a', 'bb', 'ccc'], property)[0]);

sortOn(['a', 'bb', 'ccc'] as const, 'length');
