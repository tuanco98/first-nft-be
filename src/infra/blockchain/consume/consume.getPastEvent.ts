import { FIRST_NFT_CONTRACT_ADDRESS } from './../../../config';
import { EventLog } from "web3-eth-contract";
import { isLogging } from "../../../../cron/cron.update_latest_block";
import { DAO } from "../../../database/mongo/methods";
import { GetPastEvents } from "./consume.helper";

enum AllEventName {
	AllEvents = "AllEvents",
}
export type GetPastEventOptionsType = {
	fromBlock: bigint;
	toBlock: bigint;
};
export const AllEvents = {
	...AllEventName,
	...FirstNftEventName,
};
export type TAllEvents = keyof typeof AllEvents;
export type TEventData =(string | EventLog)[]
export const getPastEvents = async (
	options: GetPastEventOptionsType,
	contract_info: ContractInfo,
) => {
	try {
		const events = await GetPastEvents(contract_info, options);
		if (isLogging() || events.length) {
			// console.log(`-> consume smart contract ${contract_info.address} info: `, { ...options, ...{ total_event: events.length } })
		}
		for (const data of events) {
			//Check already consume this txid
			const { transactionHash, eventName, blockNumber, address, logIndex } =
				data;
			if (!eventName) continue;
			console.log(`Consumed event = ${eventName} at txid = ${transactionHash}`);
			const event_data = await DAO.contract_events.common.findOne({
				txid: transactionHash as string,
				eventName: eventName,
				blockNumber: Number(blockNumber),
				contractAddress: address.toLowerCase(),
				logIndex: Number(logIndex),
			});
			if (event_data && event_data.result === "SUCCESS") continue;
			switch (eventName) {
				case AllEvents.OpenPosition:
					switch (contract_info.address) {
						case FIRST_NFT_CONTRACT_ADDRESS:
							await PositionEventHandler.OpenPosition(data);
							break;
						default:
							break;
					}
					break;
				default:
					break;
			}
		}
	} catch (e) {
		throw e;
	}
};
