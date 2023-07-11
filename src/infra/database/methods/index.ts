import { INft } from "../models/model.nft";
import { ContractEventType, getContractEventDAO } from "./dao.contract_events";
import { getNftDao, nftType } from "./dao.nft";

type DAOType = {
	nft: nftType;
    contract_events: ContractEventType;
};

const DAO: DAOType = new Object() as any;

const initDAO = () => {
	console.log(`init DAO ...`);
	DAO.nft = getNftDao();
	DAO.contract_events = getContractEventDAO();
};

export { initDAO, DAO };