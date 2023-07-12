import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  address: string;
  page?: number;
  pageSize?: number;
};
export const list_nfts_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { address, page = 0, pageSize = 10 } = request.query as InputParams;
  const total = DAO.nfts.GetTotal(address);
  const fetch_data = DAO.nfts.GetAllNFT(address, page, pageSize);
  return reply.send({ total, data: fetch_data });
};
