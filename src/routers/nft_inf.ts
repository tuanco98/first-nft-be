import { RouteOptions } from "fastify";
import { nfts_inf_get } from "../handle/nft_inf_get";

const handler = nfts_inf_get
const router: RouteOptions = {
    method: 'GET',
    url: '/nft_inf',
    handler
}
export { 
    router as nft_inf_get_route
};
