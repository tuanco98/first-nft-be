// Import the framework and instantiate it
import YAML from 'yamljs';
import Fastify from "fastify";
// import fastifySwagger from "fastify-swagger";
import fastifySwagger from "@fastify/swagger";
import { nftsRoute } from "./routers/nfts";
import { PORT_SERVER } from "../config";
import { collectionInfGetRoute } from "./routers/nft_collection";
import { nftsDetailRoute } from "./routers/nft_detail";
import { nftsMintGteAtGetRoute } from "./routers/nft_mint_greate_or_equal_at_time";
import { collectionRoute } from "./routers/nft_collection_list";
import path from 'path';

// const swaggerDocument = YAML.load('./src/server/config.yaml');


const fastify = Fastify({
  logger: true,
});
fastify.addHook("preHandler", (req, res, done) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	const isPreflight = /options/i.test(req.method);
	if (isPreflight) {
		return res.send();
	}

	done();
});
// fastify.register(fastifyStatic, {
//   root: path.join(__dirname, 'public'), // Thay đổi 'public' thành thư mục chứa các tệp tĩnh của bạn
// });
// fastify.register(fastifySwagger, {
//   routePrefix: '/'
//   swagger: swaggerDocument,
// });

fastify.register((fastify, opts, done) => {
  fastify.swagger({yaml: true})
  fastify.route(nftsRoute);
  fastify.route(collectionInfGetRoute);
  fastify.route(nftsDetailRoute);
  fastify.route(nftsMintGteAtGetRoute);
  fastify.route(collectionRoute);
  done();
});

export type nftType = { name: string; address: string };

export const connectServer = async () => {
  // Run the server!
  try {
    await fastify.listen({ port: PORT_SERVER, host: "0.0.0.0" });
    console.log(` Server running at port: ${PORT_SERVER}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
