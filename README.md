[![Build Status](https://travis-ci.org/kaelzhang/egg-snowflake.svg?branch=master)](https://travis-ci.org/kaelzhang/egg-snowflake)
[![Coverage](https://codecov.io/gh/kaelzhang/egg-snowflake/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/egg-snowflake)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/egg-snowflake?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/egg-snowflake)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/err-object.svg)](http://badge.fury.io/js/err-object)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/err-object.svg)](https://www.npmjs.org/package/err-object)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/egg-snowflake.svg)](https://david-dm.org/kaelzhang/egg-snowflake)
-->

# egg-snowflake

Egg plugin to generate unique and increased twitter-snowflake uuid.

## Install

```sh
$ npm install egg-snowflake
```

## Configurations

config/plugin.js

```js
exports.snowflake = {
  enable: true,
  package: 'egg-snowflake'
}
```

config/config.default.js

```
|--- timestamp ---|- machine -|- worker -|-- serial --|
|----- 41 bit ----|---- 6 ----|--- 4 ----|---- 12 ----|
 00000000000000000   000001       0000    000000000000
```

```js
exports.snowflake = {
  client: {
    machineIdBitLength: 6,
    workerIdBitLength: 4,
    serialIdBitLength: 12,
    machineId: 1
  }
}
```

Then:

```js
...
  async doSomething () {
    const uuid = this.app.snowflake.uuid()
  }
...
```

## License

MIT
