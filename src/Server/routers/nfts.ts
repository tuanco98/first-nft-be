import { RouteOptions } from "fastify";
import { list_nfts_get } from "../handle/nfts_list";

const handler = list_nfts_get;

const router: RouteOptions = {
  method: "GET",
  url: "/nfts",
  handler,
};

export { router as nftsRoute };
