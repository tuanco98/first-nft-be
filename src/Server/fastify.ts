// Import the framework and instantiate it
import Fastify from "fastify";
import { nftsRoute } from "./routers/nfts";
import { PORT_SERVER } from "../config";
import { collection_inf_get_route } from "./routers/nft_collection";
import { nftsDetailRoute } from "./routers/nft_detail";
import { nftsMintGteAtGetRoute } from "./routers/nft_mint_greate_or_equal_at_time";

const fastify = Fastify({
  logger: true,
});

fastify.register((fastify, opts, done) => {
  fastify.route(nftsRoute);
  fastify.route(collection_inf_get_route);
  fastify.route(nftsDetailRoute);
  fastify.route(nftsMintGteAtGetRoute);
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
