import { RouteOptions } from "fastify";
import { list_nfts_get } from "../handle/nfts_list";
import define_swagger from './../schema_swagger/nfts_list.json'
const handler = list_nfts_get;

const router: RouteOptions = {
  method: "GET",
  url: "/nfts-get",
  schema: define_swagger,
  handler,
};

export { router as nftsRoute };
