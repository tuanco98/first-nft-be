import { ObjectId } from "mongodb";

export interface Nft {
    _id?: ObjectId
    name?: string
    token_id: number
    owner_address: string
    img_uri: string
    description: string
    create_at: Date
    update_at: Date
}
