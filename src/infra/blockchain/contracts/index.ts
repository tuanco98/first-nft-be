import { CONSUME_START_BLOCK, CONSUME_STEP_BLOCK, FIRST_NFT_CONTRACT_ADDRESS } from "../../../config";
import { first_nft_contract, web3 } from "../web3";
import { FIRST_NFT_CONTRACT_ABI } from "./first_nft/abi";

type ContractInfo = {
	address: string;
	abi: any;
	init_start_block: number;
	step_block: number;
};
const getInitContract = (contract_info: ContractInfo) => {
	switch(contract_info.address) {
		case FIRST_NFT_CONTRACT_ADDRESS:
			return first_nft_contract
		default:
			throw new Error(`Contract ${contract_info.address} is not init`)
	}
}
const getContractInfo: (contract: string) => ContractInfo | null = (
	_contract: string,
) => {
	const contract = web3.utils.toChecksumAddress(_contract);
	switch (contract) {
		case FIRST_NFT_CONTRACT_ADDRESS:
			return {
				address: FIRST_NFT_CONTRACT_ADDRESS,
				abi: FIRST_NFT_CONTRACT_ABI,
				init_start_block: CONSUME_START_BLOCK,
				step_block: CONSUME_STEP_BLOCK,
			};
		default:
			return null;
	}
};

export { getContractInfo, ContractInfo, getInitContract };