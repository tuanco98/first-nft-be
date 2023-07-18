import { config } from "dotenv";
import { getEnvString, getIntFromEnv } from "./lib/config.helper";
config()


// string
export const NODE_ENV = getEnvString("NODE_ENV");
export const SERVER_CODE = getEnvString("SERVER_CODE");
export const MONGO_URI = getEnvString("MONGO_URI");
export const WEB3_PROVIDER = getEnvString("WEB3_PROVIDER");
export const MONGO_DB_NAME = getEnvString("MONGO_DB_NAME");
export const FIRST_NFT_CONTRACT_ADDRESS = getEnvString("FIRST_NFT_CONTRACT_ADDRESS");
export const REDIS_PREFIX = getEnvString("REDIS_PREFIX");
export const REDIS_URI = getEnvString("REDIS_URI");
export const PRIVATE_KEY = getEnvString("PRIVATE_KEY");

// int
export const PORT_SERVER = getIntFromEnv("PORT_SERVER");
export const CONSUME_START_BLOCK = getIntFromEnv("CONSUME_START_BLOCK");
export const CONSUME_STEP_BLOCK = getIntFromEnv("CONSUME_STEP_BLOCK");
export const ANTI_REORG_BLOCK_NUMBER = getIntFromEnv("ANTI_REORG_BLOCK_NUMBER");
export const AVG_BLOCK_TIME_SEC = getIntFromEnv("AVG_BLOCK_TIME_SEC");

export const LIST_CONTRACT = [
	FIRST_NFT_CONTRACT_ADDRESS,
];
