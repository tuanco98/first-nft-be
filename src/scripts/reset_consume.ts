import {
	LIST_CONTRACT,
	MONGO_URI,
} from "../config";
import { reset_consume } from "../infra/blockchain/consume/consume.reset";
import { initRedis } from "../infra/cache/redis";
import { connectMongo } from "../infra/database/mongo";

const script = async () => {
	await initRedis();
	await connectMongo(MONGO_URI);
	reset_consume(LIST_CONTRACT);
};

script();
