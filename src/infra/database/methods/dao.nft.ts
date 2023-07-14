import { ClientSession, Filter } from "mongodb";
import { INft } from "../models/model.nft";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.nfts,
  GetOneNFTInfo: (token_id: number) => {
    return collections.nfts.findOne({ token_id });
  },
  GetAllNFT: (owner_address: string, page = 0, pageSize = 10) => {
    return collections.nfts
      .find({ owner_address })
      .limit(page)
      .skip(page * pageSize)
      .toArray();
  },
  GetNFTByTime: (create_at: number, page = 0, pageSize = 10) => {
    const dateFormat = new Date(create_at);
    return collections.nfts
      .find({ create_at: { $gte: dateFormat } })
      .limit(page)
      .skip(page * pageSize)
      .toArray();
  },
  GetTotal: (filter: Filter<INft>) => {
    return collections.nfts.countDocuments(filter);
  },
  InsertOneNft: (nft: INft, session?: ClientSession) => {
    return collections.nfts.updateOne(
      { mint_txid: nft.mint_txid },
      { $setOnInsert: nft },
      { session, upsert: true }
    );
  },
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getNftDao, DAOType as nftType };
