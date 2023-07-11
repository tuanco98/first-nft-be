import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionNft_inf } from "../../infra/database/mongo";

type InputParams = {
    contract_address: string
  };
  export const nfts_inf_get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { contract_address } = request.query as InputParams
    const filter = {contract_address}
    if(!contract_address) { throw new Error }
    const fetch_data = await CollectionNft_inf.findOne(filter)
    
    return reply.send(fetch_data)
  };