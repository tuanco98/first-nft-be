// Import the framework and instantiate it
import { Connect } from './database/connect'
import Fastify from "fastify"
import { nftsRoute } from './routers/nfts';
import { insertRoute } from './routers/insertNFT';
import { updateRoute } from './routers/update';
import { PORT_SERVER } from './config';

const fastify = Fastify({
  logger: true,
});

fastify.register((fastify, opts, done) => {
  fastify.route(nftsRoute)
  fastify.route(insertRoute)
  fastify.route(updateRoute)
  done()
})

export type nftType = { name: string, address: string }

const main = async () => {
  // Run the server!
  try {
    await Connect()
    await fastify.listen({ port: PORT_SERVER, host: '0.0.0.0' });
    console.log(` Server running at port: ${PORT_SERVER}`)

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
main()