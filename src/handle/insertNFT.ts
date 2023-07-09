import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionNft } from "../database/connect";

type InputParams = {
    address: string
    name: string
    token_id: number
}

export const insert_NFT = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const {address, name, token_id} = request.body as InputParams;

    if (!address) throw new Error('missing name')
    if (!name) throw new Error('missing address')
    if (!token_id) throw new Error('missing token id')
    
    await CollectionNft.insertOne({address: address, name: name, token_id: token_id, create_at: new Date(), update_at: new Date()})
    
    return reply.send({address: address, name: name, token_id: token_id})
}