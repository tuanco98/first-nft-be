import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  contract_address: string;
};
export const nft_collection_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { contract_address } = request.query as InputParams;
  if (!contract_address) {
    throw new Error();
  }
  const fetch_data = await DAO.collection_info.GetOneCollectionInfo(
    contract_address
  );
  return reply.send(fetch_data);
};
