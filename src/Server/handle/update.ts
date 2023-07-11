import { FastifyRequest, FastifyReply } from "fastify";
import { CollectionNft } from "../../infra/database/mongo";
import { ObjectId } from "mongodb";

type InputParams = {
  id: string;
  name?: string
  token_id: number
  owner_address: string
  img_uri: string
  description: string
};

const validateInput = (input: InputParams) => {
  const { id, token_id, owner_address, img_uri, description} = input
    if (!id) throw new Error("missing id");
    if (!token_id) throw new Error("Err");
    if (!owner_address) throw new Error("err");
    if (!img_uri) throw new Error("err");
    if (!description) throw new Error("err");
}
export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id,  name, token_id, owner_address, img_uri, description} = request.body as InputParams
    validateInput({id, token_id, owner_address, img_uri, description})
    await CollectionNft.updateOne(
      { _id: new ObjectId(id) },
      { $set: {name: name, token_id: token_id, owner_address: owner_address, img_uri: img_uri, description: description} }
    );

    return reply.send("update complete");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
