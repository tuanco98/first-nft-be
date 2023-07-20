import { RouteOptions } from "fastify";
import { list_collection_get as list_collections_get } from "../handle/nft_collection_list";
import define_swagger from './../schema_swagger/collections_list.json'

const handler = list_collections_get;

const router: RouteOptions = {
  method: "GET",
  url: "/collections-get",
  schema: define_swagger,
  handler,
};
export { router as collectionRoute };
