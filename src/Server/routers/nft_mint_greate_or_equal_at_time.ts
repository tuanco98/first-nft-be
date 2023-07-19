import { RouteOptions } from "fastify";
import { nft_mint_greate_or_equal_at_time_get } from "../handle/nft_mint_greate_or_equal_at_time";


const handler = nft_mint_greate_or_equal_at_time_get;

const router: RouteOptions = {
  method: "GET",
  url: "/nfts-mint-gte-at-get",
  handler,
};

export { router as nftsMintGteAtGetRoute };
