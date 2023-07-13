import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  owner_address: string;
} & PagingParams;
export const list_nfts_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { owner_address, page = 0, pageSize = 10 } = request.query as InputParams;
  const [total, fetch_data] = await Promise.all([
    DAO.nfts.GetTotal({owner_address}),
    DAO.nfts.GetAllNFT(owner_address, page, pageSize)
  ])
  return reply.send({ total, fetch_data });
};
