import { ContractEventType, getContractEventDAO } from "./dao.contract_events";
import { CollectionInfoType, getCollectionInfoDAO } from "./dao.collection_info";
import { getNftDao, nftType } from "./dao.nft";
import { ITransactionType, transactionReceiptDAO } from "./dao.transactions_recept";

type DAOType = {
	nfts: nftType;
    contract_events: ContractEventType;
    collection_info: CollectionInfoType;
	transaction_receipt: ITransactionType;
};

const DAO: DAOType = new Object() as any;

const initDAO = () => {
	console.log(`init DAO ...`);
	DAO.nfts = getNftDao();
	DAO.contract_events = getContractEventDAO();
	DAO.collection_info = getCollectionInfoDAO();
	DAO.transaction_receipt = transactionReceiptDAO();
};

export { initDAO, DAO };