import { RouteOptions } from "fastify";
import { list_collection_get as list_collections_get } from "../handle/nft_collection_list";

const handler = list_collections_get;

const router: RouteOptions = {
  method: "GET",
  url: "/collections-get",
  handler,
};
export { router as collectionRoute };
