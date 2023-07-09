import { FastifyRequest, FastifyReply } from "fastify";
import { CollectionNft } from "../database/connect";
import { ObjectId } from "mongodb";

type InputParams = {
  id: string;
  address: string;
  name: string;
  token_id: number;
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id, address, name, token_id } = request.body as InputParams;
    if (!id) throw new Error("missing id");
    if (!address) throw new Error("Err");
    if (!name) throw new Error("err");
    if (!token_id) throw new Error("err");

    await CollectionNft.updateOne(
      { _id: new ObjectId(id) },
      { $set: { address: address, name: name, token_id: token_id } }
    );

    return reply.send("update complete");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
