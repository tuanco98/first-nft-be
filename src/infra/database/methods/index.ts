import { ContractEventType, getContractEventDAO } from "./dao.contract_events";
import { CollectionInfoType, getCollectionInfoDAO } from "./dao.collection_info";
import { getNftDao, nftType } from "./dao.nft";

type DAOType = {
	nfts: nftType;
    contract_events: ContractEventType;
    collection_info: CollectionInfoType;
};

const DAO: DAOType = new Object() as any;

const initDAO = () => {
	console.log(`init DAO ...`);
	DAO.nfts = getNftDao();
	DAO.contract_events = getContractEventDAO();
	DAO.collection_info = getCollectionInfoDAO();
};

export { initDAO, DAO };