import { RouteOptions } from "fastify";
import { nft_collection_get } from "../handle/nft_collection_get";
import define_swagger from '../schema_swagger/collection_detail.json'
const handler = nft_collection_get;

const router: RouteOptions = {
  method: "GET",
  url: "/collection-detail-get",
  schema: define_swagger,
  handler,
};
export { router as collectionInfGetRoute };
