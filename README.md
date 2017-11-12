# any-eval

Super handy eval of anything.

Supports JS-expression, CommonJS module contents and JSON/JSON5.

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:           http://www.npmjs.org/package/any-eval
[npm-img]:       https://img.shields.io/npm/v/any-eval.svg

[travis]:        https://travis-ci.org/node-eval/any-eval
[test-img]:      https://img.shields.io/travis/node-eval/any-eval/master.svg?label=tests

[coveralls]:     https://coveralls.io/r/node-eval/any-eval
[coveralls-img]: https://img.shields.io/coveralls/node-eval/any-eval/master.svg

[david]:         https://david-dm.org/node-eval/any-eval
[david-img]:     https://img.shields.io/david/node-eval/any-eval/master.svg

## Install

```
$ npm install --save any-eval
```

## Usage

### JS-expression

```js
const anyEval = require('any-eval');

anyEval('42 * 42'); // 1764
```

### CommonJS

```js
const anyEval = require('any-eval');
const moduleContents =
`
    const package = require('./package.json');

    module.exports = {
        name: package.name
    };
`;

anyEval(moduleContents, './index.js'); // filename need to provide required info to resolve relative paths inside evaluating code

// ➜ { name: 'any-eval' }
```

### JSON

```js
const anyEval = require('any-eval');
const jsonContents = '{ "name": "any-eval" }';

anyEval(jsonContents, 'my.json'); // filename need to `any-eval` determinate json format by extention

// ➜ { name: 'any-eval' }
```

### JSON5

```js
const anyEval = require('any-eval');
const jsonContents = "{ name: 'any-eval' }";

anyEval(jsonContents, 'my.json5'); // filename need to `any-eval` determinate json format by extention

// ➜ { name: 'any-eval' }
```

## API

### anyEval(contents[, filename, context])

#### contents

Type: `string`

The JS-expression, CommonJS module contents or JSON/JSON5 contents.

#### filename

Type: `string`

The path to file which contents we execute.

The `any-eval` determinate format by extension. If filename ends with `.js`, its contents will be evaluating with [vm](https://nodejs.org/dist/latest/docs/api/vm.html). If filename ends with `.json`, its contents will be parsing with `JSON.parse`. If filename ends with `.json5`, its contents will be parsing with [json5](https://github.com/json5/json5). 

By default expected JS-expression or CommonJS module contents.

```js
const anyEval = require('any-eval');

anyEval('42 * 42'/* js by default */); // 1764
anyEval('42 * 42', 'my.js'); // 1764
anyEval('{ "name": "any-eval" }', 'my.json'); // '{ name: 'any-eval' }'
anyEval("{ name: 'any-eval' }", 'my.json5');  // '{ name: 'any-eval' }'
```

To evaluating CommonJS module contents filename is required to resolve relative paths inside evaluating code.

```js
const anyEval = require('any-eval');
const moduleContents =
`
    const package = require('./package.json'); // to resolve this require need to know the path of current module (./index.js)

    module.exports = {
        name: package.name
    };
`;

anyEval(moduleContents, './index.js'); // filename need to provide required info to resolve relative paths inside evaluating code
```

Internally `any-eval` will resolve passed relative paths using the place it's called (like `require` do).

It may spend additional processor's time on it, so better to pass in absolute path.

```js
const fs = require('fs');
const anyEval = require('any-eval');

// For example, current path is "/repos/project/lib/file.js".
const modulePath = '../files/another.js';
const moduleContents = fs.readFileSync(modulePath, 'utf-8');

// '../files/another.js' will be resolved to '/repos/project/files/another.js'
anyEval(moduleContents, modulePath);
```

#### context

Type: `Object`

The object to provide into execute method.

If `context` is specified, then module contents will be evaluating with `vm.runInNewContext`.

If `context` is not specified, then module contents will be evaluating with `vm.runInThisContext`.

With `context` you can provide some like-a-global variables into `any-eval`.

```js
const anyEval = require('any-eval');

const secretKey = '^___^';
const contents = 'module.exports = secretKey;';

anyEval(content, { secretKey }); // '^___^'
```

## Related

* [node-eval](https://github.com/node-eval/node-eval) — eval Node.js contents only (JS-expression, CommonJS modules and JSON).
* [node-file-eval](https://github.com/node-eval/node-file-eval) — read node.js file and eval it with [node-eval](https://github.com/node-eval/node-eval).
* [file-eval](https://github.com/node-eval/file-eval) — read any file and eval it with [any-eval](https://github.com/node-eval/any-eval).
