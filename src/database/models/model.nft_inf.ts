import { ObjectId } from "mongodb";

type SocialType = 'twitter'|'discord'|'website'
interface Social {
    type: SocialType
    link: string
}
type ChainNetwork = 'etherum' | 'bsc' 

export interface NFT_inf {
    _id?: ObjectId
    contract_address: string
    chain_network: ChainNetwork
    description: string
    social: Social[]
    image_uri?: string
}