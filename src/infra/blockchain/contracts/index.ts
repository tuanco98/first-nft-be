import { FIRST_NFT_CONTRACT_ADDRESS } from "../../../config";
import { lowerCase } from "../../../lib/utils";
import { FIRST_NFT_CONTRACT_ABI } from "./fisrt_nft/abi";

type ContractInfo = {
	address: string;
	abi: any;
	init_start_block: number;
	step_block: number;
};
const getContractInfo: (contract: string) => ContractInfo | null = (
	_contract: string,
) => {
	const contract = lowerCase(_contract);
	switch (contract) {
		// case TRADING_CONTRACT_ADDRESS: return {
		//     address: TRADING_CONTRACT_ADDRESS,
		//     abi: TRADING_ABI,
		//     init_start_block: TRADING_CONTRACT_START_BLOCK,
		//     step_block: TRADING_CONTRACT_STEP_BLOCK
		// }
		case FIRST_NFT_CONTRACT_ADDRESS:
			return {
				address: FIRST_NFT_CONTRACT_ADDRESS,
				abi: FIRST_NFT_CONTRACT_ABI,
				init_start_block: 0,
				step_block: 1000,
			};
		default:
			return null;
	}
};

export { getContractInfo, ContractInfo };