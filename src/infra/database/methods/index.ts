import { ContractEventType, getContractEventDAO } from "./dao.contract_events";
import { NftInfoType, getNftInfoDAO } from "./dao.inf_nft";
import { getNftDao, nftType } from "./dao.nft";

type DAOType = {
	nft: nftType;
    contract_events: ContractEventType;
    nft_info: NftInfoType;
};

const DAO: DAOType = new Object() as any;

const initDAO = () => {
	console.log(`init DAO ...`);
	DAO.nft = getNftDao();
	DAO.contract_events = getContractEventDAO();
	DAO.nft_info = getNftInfoDAO();
};

export { initDAO, DAO };