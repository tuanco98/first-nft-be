import { IndexDescription, ObjectId } from "mongodb";

type SocialType = "twitter" | "discord" | "website";
interface Social {
  type: SocialType;
  link: string;
}
type ChainNetwork = "etherum" | "bsc";

export interface ICollection {
  _id?: ObjectId;
  collection_name: string;
  contract_address: string;
  chain_network: ChainNetwork;
  description: string;
  social: Social[];
  image_uri?: string;
  create_at: Date;
  update_at: Date;
}
export const InfoCollection: IndexDescription[] = [
  { key: { txid: 1, blockNumber: 1 }, unique: true, background: true },
  { key: { txid: 1 }, background: true },
  { key: { eventName: 1 }, background: true },
  { key: { result: 1 }, background: true },
];
