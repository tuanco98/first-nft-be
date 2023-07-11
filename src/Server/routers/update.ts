import { RouteOptions } from "fastify";
import { update } from "../handle/update";

const handler = update

const router: RouteOptions = {
    method:'POST',
    url: '/update',
    handler
}

export {router as updateRoute}