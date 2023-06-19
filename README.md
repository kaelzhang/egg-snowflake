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

# Deprecation Warning

Since this library only works for cluster mode of egg which is not a best practice for the de facto container-based server-side solutions such as Kubernetes.

So I will archived this project and turn it into readonly mode.

****

# egg-snowflake

Egg plugin to generate unique and increased [twitter-snowflake](https://www.slideshare.net/davegardnerisme/unique-id-generation-in-distributed-systems) uuid.

`egg-snowflake` will first assign a unique worker id to each worker by using the IPC messaging, and then create uuid according to the twitter snowflake algorithm.

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

```js
// |--- timestamp ---|- machine -|- worker -|-- serial --|
// |----- 41 bit ----|---- 6 ----|--- 4 ----|---- 12 ----|
// |                 |           |          |            |
//  00000000000000000    000001      0000    000000000000

exports.snowflake = {
  client: {
    machineId: 1,
    // `Number` if 6-bit length (the default value),
    // we could handle servers from `2 ** 6` different machines.
    // And if 0, there will be no machine id in the uuid
    machineIdBitLength: 6,
    workerIdBitLength: 4,
    // Could handle max 4096 requests per millisecond
    serialIdBitLength: 12
  }
}
```

Then:

```js
...
  async doSomething () {
    const {snowflake} = this.app

    const uuid = await snowflake.uuid()
    console.log(uuid)
    // '6352534847126241280'

    const workerId = await snowflake.index()
    console.log(workerId)
    // 0
  }
...
```

### await snowflake.uuid()

Generates the unique and time-based id across workers (/ machines)

Returns `String | Promise<String>` instead of `Number` due to the bad accuracy of JavaScript.

The bit-length of the return value equals to:

```js
41 + machineIdBitLength + workerIdBitLength + serialIdBitLength
```

So you could use the three configuration options to handle the length of uuids.

### await snowflake.index()

Returns `String | Promise<Number>` the 0-index unique worker id of the current cluster.

## License

MIT
