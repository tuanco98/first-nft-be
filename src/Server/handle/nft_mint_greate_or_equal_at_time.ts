import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  create_at: Date;
};
export const nft_mint_greate_or_equal_at_time_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { create_at } = request.query as InputParams;
  const fetch_data = await DAO.nfts.GetNFTByTime(Number(create_at));
  console.log(fetch_data)
  return reply.send({ fetch_data });
};
