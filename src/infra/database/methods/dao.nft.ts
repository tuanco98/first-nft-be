import { collections } from "../mongo";

const getDAO =  () => ({
	common: collections.nfts,
	GetOneNFTInfo: (token_id: number) => {
		return collections.nfts.findOne({token_id})
	},
	GetAllNFT: (address: string, page = 0, pageSize = 10) => {
		return collections.nfts.find({address}).limit(page)
		.skip(page * pageSize)
		.toArray();
	},
	GetTotal: (address: string) => {
		return collections.nfts.countDocuments({address});
	}
});


type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getNftDao, DAOType as nftType };