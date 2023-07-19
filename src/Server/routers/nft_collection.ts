import { RouteOptions } from "fastify";
import { nft_collection_get } from "../handle/nft_collection_get";

const handler = nft_collection_get;

const router: RouteOptions = {
  method: "GET",
  url: "/collection-detail-get",
  handler,
};
export { router as collectionInfGetRoute };
