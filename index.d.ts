interface Snowflake {
  index: () => number;
  uuid: () => string;
}

interface EggSnowflakeClientOption {
  workerIdBitLength: number;
  machineIdBitLength: number;
  serialIdBitLength: number;
}

interface EggSnowflakeOptions {
  client: EggSnowflakeClientOption
}

declare module 'egg' {
  interface Application {
    snowflake: Snowflake;
  }

  interface EggAppConfig {
    snowflake: EggSnowflakeOptions;
  }
}
