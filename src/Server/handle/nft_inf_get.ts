import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

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
    const fetch_data = await  DAO.nft_info.common.findOne(filter)
    
    return reply.send(fetch_data)
  };