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

Egg plugin to define multiple snowflake in a convenient way.

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
exports.snowflake = {
  foo: {
    // Load into app, default is open
    app: true,
    // Load into agent, default is close
    agent: false,
    create: (config, app) => {
      return a => {
        console.log(a)
      }
    }
  }
}
```

Then:

```js
...
  async doSomething () {
    this.app.foo('hello')
  }
...
```

## License

MIT
