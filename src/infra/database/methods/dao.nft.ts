import { ClientSession } from "mongodb";
import { INft } from "../models/model.nft";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.nfts,
  InsertOneNft: (nft: INft, session?: ClientSession) => {
    return collections.nfts.updateOne(
      { mint_txid: nft.mint_txid },
      { $setOnInsert: { nft } },
      { session, upsert: true }
    );
  },
});
type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getNftDao, DAOType as nftType };
