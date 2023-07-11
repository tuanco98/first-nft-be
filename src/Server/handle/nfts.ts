import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  address: string
  page?: number
  pageSize?: number
};
export const list_nfts_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { address, page = 0, pageSize = 10 } = request.query as InputParams;
  const filter = { address };
  const fetch_data = await DAO.nft.common.find(filter)
    .limit(pageSize)
    .skip(page * pageSize)
    .toArray();
  const total = await  DAO.nft.common.countDocuments(filter);
  return reply.send({ total, data: fetch_data });
};
