exports.snowflake = {
  client: {
    // max 16 workers
    workerIdBitLength: 4,
    // max 64 machines
    machineIdBitLength: 6,
    serialIdBitLength: 12
  }
}
