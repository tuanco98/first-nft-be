import { GetPastEventOptionsType, TEventData } from "./consume.getPastEvent";
import { ContractInfo, getInitContract } from "../contracts";
import { getCurrentBlockNumberConsume } from "../../cache/cache.current_block_number_consume";

const getStartBlock = async (
	contract_address: string,
	init_start_block: number,
) => {
	const getCurrentBlock: number | null = await getCurrentBlockNumberConsume(
		contract_address,
	);
	return getCurrentBlock ? getCurrentBlock : init_start_block;
};

const getConsumeOptions = (
	start_block: number,
	latest_block: number,
	step_block: number,
) => {
	const currentBlockWithStepBlock = start_block + step_block - 1;
	const toBlock =
		currentBlockWithStepBlock >= latest_block
			? latest_block - 1
			: currentBlockWithStepBlock;
	return { fromBlock: start_block, toBlock };
};
const GetPastEvents = async (
	contract_info: ContractInfo,
	options: GetPastEventOptionsType,
): Promise<TEventData[]> => {
	const contract = getInitContract(contract_info)
	const events = await contract.getPastEvents({
		fromBlock: options.fromBlock,
		toBlock: options.toBlock,
	}) as TEventData[];
	return events;
};
export { getStartBlock, getConsumeOptions, GetPastEvents };
