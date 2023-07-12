import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  token_id: number;
};
export const nft_detail = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { token_id } = request.query as InputParams;
  const fetch_data = await DAO.nfts.GetOneNFTInfo(token_id);
  return reply.send({ data: fetch_data });
};
