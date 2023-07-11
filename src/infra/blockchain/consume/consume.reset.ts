import { isAddress } from "web3-validator"
// import { delCurrentBlockNumberConsume } from "../../../cache/cache.current_block_number_consume";
import { getUniqueArr } from "../../../lib/utils";
import { DAO } from "../../database/methods";
import { delCurrentBlockNumberConsume } from "../../cache/cache.current_block_number_consume";

const reset_consume = async (list_contract: string[]) => {
	try {
		const transform_list_contracts = list_contract.filter(el => isAddress(el, false));
		const remove_dup_contracts = getUniqueArr(transform_list_contracts);
		for (const contract_address of remove_dup_contracts) {
			await delCurrentBlockNumberConsume(contract_address);
			const { deletedCount } = await DAO.contract_events.common.deleteMany({
				contractAddress: contract_address.toLowerCase(),
			});
			console.log(
				`delete ${contract_address} consume tracker and ${deletedCount} documents ...`,
			);
		}
		console.log(`delete success!`);
	} catch (e) {
		throw e;
	}
};

export { reset_consume };
