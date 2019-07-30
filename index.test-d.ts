import {expectType} from 'tsd';
import sortOn = require('.');

expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x')[0].x);
expectType<any>(sortOn<any>([{x: 'b'}, {x: 'a'}, {x: 'c'}], 'x')[0].x);

expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], ['x'])[0].x);
expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], element => element.x)[0].x);
expectType<string>(sortOn([{x: 'b'}, {x: 'a'}, {x: 'c'}], [element => element.x])[0].x);

const property: sortOn.Property<string> = string => expectType<string>(string);
expectType<string>(sortOn(['a', 'bb', 'ccc'], property)[0]);

sortOn(['a', 'bb', 'ccc'] as const, 'length');
