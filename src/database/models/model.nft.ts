import { ObjectId } from "mongodb";

export interface Nft {
    _id?: ObjectId
    name: string
    address: string
    token_id: number
    create_at: Date
    update_at: Date
}
