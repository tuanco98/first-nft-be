import { collections } from "../mongo";

const getDAO = () => ({
	common: collections.collection_info,
	GetOneCollectionInfo: (address: string) => {
		return collections.collection_info.findOne({address})
	}
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getCollectionInfoDAO, DAOType as CollectionInfoType };
