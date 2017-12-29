const assert = require('assert')
const {Big} = require('big.js')

const EVENT_INIT = 'egg-snowflake-init'
const EVENT_REPLY = 'egg-snowflake-reply'
const EVENT_EGG_READY = 'egg-ready'

// - 41 bit timestamp
// - `machineIdBitLength` bit machine id
// - `workerIdBitLength` bit worker id
// - 12 bit serial no

class Snowflake {
  constructor (app, {
    machineIdBitLength = 6,
    workerIdBitLength = 4,
    serialIdBitLength = 12,
    machineId
  }) {
    const {messenger} = this._app = app
    this._index = -1
    this._count = 0
    this._resetTime = Date.now()

    let o1, o2, o3

    o1 = 2 ** machineIdBitLength * (
      o2 = 2 ** workerIdBitLength * (
        o3 = 2 ** serialIdBitLength
      )
    )

    this._offset = [o1, o3]

    this._machineId = o1 !== o2 && machineId
      ? machineId * 2 ** o2
      : 0

    messenger.once(EVENT_EGG_READY, () => {
      const {pid} = process
      messenger.sendToAgent(EVENT_INIT, {
        pid
      })
    })

    messenger.once(EVENT_REPLY, ({index}) => {
      this._index = index
    })
  }

  index () {
    return this._index === -1
      ? this._getIndex()
      : this._index
  }

  uuid () {
    if (this._index !== -1) {
      return this._uuid(this._index)
    }

    return this._getIndex()
    .then(index => this._uuid(index))
  }

  _getIndex () {
    return new Promise(resolve => {
      this._app.messenger.once(EVENT_REPLY, ({index}) => {
        resolve(index)
      })
    })
  }

  _getCount (now) {
    if (now - this._resetTime > 1000) {
      return this._count = 0
    }

    return this._count ++
  }

  _uuid (index) {
    const now = Date.now()
    const count = this._getCount(now)
    const [o1, o3] = this._offset

    // now << 22(default),
    // but in JavaScript we should use big.js
    let uuid = new Big(now).times(o1)
    .plus(count)

    if (this._machineId) {
      uuid = uuid.plus(this._machineId)
    }

    if (o3) {
      uuid = uuid.plus(index * o3)
    }

    return uuid.toString()
  }
}

function create (config = {}, app) {
  return new Snowflake(app, config)
}

exports.app = app => {
  app.addSingleton('snowflake', create)
}

exports.agent = agent => {
  let index = 0

  agent.messenger.on(EVENT_INIT, ({pid}) => {
    agent.messenger.sendTo(pid, EVENT_REPLY, {
      index: index ++
    })
  })
}
