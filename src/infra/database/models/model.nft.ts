import { IndexDescription, ObjectId } from "mongodb";

export interface INft {
    _id?: ObjectId
    name?: string
    token_id: number
    owner_address: string
    mint_txid: string
    image_uri?: string
    description?: string
    create_at: Date
    update_at: Date
    mint_at: Date
}
export const NftIndexes: IndexDescription[] = [
	{ key: { token_id: 1 }, unique: true, background: true },
	{ key: { mint_txid: 1 },  unique: true, background: true },
	{ key: { owner_address: 1 }, background: true },
	{ key: { create_at: 1 }, background: true },
];