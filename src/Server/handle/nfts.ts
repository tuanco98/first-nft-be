import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionNft } from "../../infra/database/mongo";

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
  const fetch_data = await CollectionNft.find(filter)
    .limit(pageSize)
    .skip(page * pageSize)
    .toArray();
  const total = await CollectionNft.countDocuments(filter);
  return reply.send({ total, data: fetch_data });
};
