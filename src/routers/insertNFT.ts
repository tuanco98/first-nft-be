import { RouteOptions } from "fastify"
import { insert_NFT } from "../handle/insertNFT"

const handler = insert_NFT

const router: RouteOptions = {
    method: "POST",
    url: "/insert",
    handler,
}

export {
    router as insertRoute
}