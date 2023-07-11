// Import the framework and instantiate it
import Fastify from "fastify"
import { nftsRoute } from './routers/nfts';
import { insertNFTRoute } from './routers/insertNFT';
import { updateRoute } from './routers/update';
import { PORT_SERVER } from '../config';
import { nft_inf_get_route } from './routers/nft_inf';

const fastify = Fastify({
  logger: true,
});

fastify.register((fastify, opts, done) => {
  fastify.route(nftsRoute)
  fastify.route(insertNFTRoute)
  fastify.route(updateRoute)
  fastify.route(nft_inf_get_route)
  done()
})

export type nftType = { name: string, address: string }

export const connectServer = async () => {
  // Run the server!
  try {
    await fastify.listen({ port: PORT_SERVER, host: '0.0.0.0' });
    console.log(` Server running at port: ${PORT_SERVER}`)

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
