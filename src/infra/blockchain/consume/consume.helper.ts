import { Address } from "viem";
import { GetPastEventOptionsType, TEventData } from "./consume.getPastEvent";
import { Contract } from "../web3";
import { ContractInfo } from "../contracts";

const getStartBlock = async (
	contract_address: Address,
	init_start_block: bigint,
) => {
	const getCurrentBlock: bigint | null = await getCurrentBlockNumberConsume(
		contract_address,
	);
	return getCurrentBlock ? getCurrentBlock : init_start_block;
};

const getConsumeOptions = (
	start_block: bigint,
	latest_block: bigint,
	step_block: bigint,
) => {
	const currentBlockWithStepBlock = start_block + step_block - 1n;
	const toBlock =
		currentBlockWithStepBlock >= latest_block
			? latest_block - 1n
			: currentBlockWithStepBlock;
	return { fromBlock: start_block, toBlock };
};
const GetPastEvents = async (
	contract_info: ContractInfo,
	options: GetPastEventOptionsType,
): Promise<TEventData> => {
	const logs = await Contract.FIRST_NFT_CONTRACT.getPastEvents({
		fromBlock: options.fromBlock,
		toBlock: options.toBlock,
	});
	return logs;
};
export { getStartBlock, getConsumeOptions, GetPastEvents };
