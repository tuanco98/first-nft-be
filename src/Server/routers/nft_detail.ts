import { RouteOptions } from "fastify";
import { nft_detail } from "../handle/nft_detail";
import define_swagger from "./../schema_swagger/nft_detail.json";
const handler = nft_detail;

const router: RouteOptions = {
  method: "GET",
  url: "/nft-detail-get",
  schema: define_swagger,
  handler,
};

export { router as nftsDetailRoute };
