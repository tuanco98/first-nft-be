import { RouteOptions } from "fastify";
import { nft_detail } from "../handle/nft_detail";

const handler = nft_detail;

const router: RouteOptions = {
  method: "GET",
  url: "/detail",
  handler,
};

export { router as nftsDetailRoute };
