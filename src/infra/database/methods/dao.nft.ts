import { collections } from "../mongo";

const getDAO = () => ({
	common: collections.nfts,
	
});
type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getNftDao, DAOType as nftType };