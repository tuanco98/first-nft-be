import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";

type InputParams = {
  name?: string;
  token_id: number;
  owner_address: string;
  img_uri: string;
  description: string;
};
const validateInput = (input: InputParams) => {
  const { token_id, owner_address, img_uri, description } = input;
  if (!token_id) throw new Error("missing token id");
  if (!owner_address) throw new Error("xxx");
  if (!img_uri) throw new Error("xxx");
  if (!description) throw new Error("xxx");
};
export const insert_NFT = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, token_id, owner_address, img_uri, description } =
    request.body as InputParams;

  validateInput({ token_id, owner_address, img_uri, description });

  await DAO.nft.common.insertOne({
    name: name,
    token_id: token_id,
    owner_address: owner_address,
    img_uri: img_uri,
    mint_txid: '',
    description: description,
    create_at: new Date(),
    update_at: new Date(),
  });

  return reply.send({
    name: name,
    token_id: token_id,
    owner_address: owner_address,
    img_uri: img_uri,
    description: description,
  });
};
