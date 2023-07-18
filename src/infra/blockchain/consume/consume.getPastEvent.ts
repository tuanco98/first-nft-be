import { FIRST_NFT_CONTRACT_ADDRESS } from './../../../config';
import { EventLog } from "web3-eth-contract";
import { GetPastEvents } from "./consume.helper";
import { ContractInfo } from '../contracts';
import { TransferEventName } from '../contracts/first_nft/event';
import { DAO } from '../../database/methods';
import { FirstNftHandle } from '../contracts/first_nft/events_handle.ts';
import { isLogging } from '../../../cron/cron.update_latest_block';

enum AllEventName {
	AllEvents = "AllEvents",
}
export type GetPastEventOptionsType = {
	fromBlock: number;
	toBlock: number;
};
export const AllEvents = {
	...AllEventName,
	...TransferEventName,
};
export type TAllEvents = keyof typeof AllEvents;
export type TEventData = EventLog
export const getPastEvents = async (
	options: GetPastEventOptionsType,
	contract_info: ContractInfo,
) => {
	try {
		const events = await GetPastEvents(contract_info, options);
		if (isLogging() || events.length) {
			console.log(`-> consume smart contract ${contract_info.address} info: `, { ...options, ...{ total_event: events.length } })
		}
		for (const data of events) {
			//Check already consume this txid
			const { transactionHash, event, blockNumber, address, logIndex } =
				data;
			if (!event) continue;
			console.log(`Consumed event = ${event} at txid = ${transactionHash}`);
			const event_data = await DAO.contract_events.common.findOne({
				txid: transactionHash as string,
				eventName: event,
				blockNumber: Number(blockNumber),
				contractAddress: address.toLowerCase(),
				logIndex: Number(logIndex),
			});
			if (event_data && event_data.result === "SUCCESS") continue;
			switch (event) {
				case AllEvents.Transfer:
					switch (contract_info.address) {
						case FIRST_NFT_CONTRACT_ADDRESS:
							await FirstNftHandle.Transfer(data);
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
