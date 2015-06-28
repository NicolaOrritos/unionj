#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

Unionj
======
> Unify JSON documents


## Install

```sh
$ npm install --save unionj
```


## Usage

```js
var obj1 = { 'k1': 'v1a' };
var obj2 = { 'k1': 'v1b' };

var unionj = require('unionj');

var result = unionj.add(obj1, obj2);

console.log(result.k1);  // v1b
```

## Rules
There are only two rules that drive the merge process:
- _"Simple addition"_ rule: if a field is in one of the documents but not in the other one then that field will be in the resulting doc and get the value it holds in the doc it appears in
- _"Second-over-first"_ rule: if a field is in both documents it will be in the resulting doc and get the value it holds in the second one


## License

MIT © [Nicola Orritos](nicolaorritos.github.io)


[npm-image]: https://badge.fury.io/js/unionj.svg
[npm-url]: https://npmjs.org/package/unionj
[travis-image]: https://travis-ci.org/NicolaOrritos/unionj.svg?branch=master
[travis-url]: https://travis-ci.org/NicolaOrritos/unionj
[daviddm-image]: https://david-dm.org/NicolaOrritos/unionj.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/NicolaOrritos/unionj
