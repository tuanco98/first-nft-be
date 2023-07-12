import { ClientSession } from "mongodb";
import { TEventData } from "../../../consume/consume.getPastEvent";
import { EventHandler, EventHandlerCallback } from "../../../helper";
import { TTransferRawEvent, convertTransferRawEvent } from "../event";
import { NULL_ADDRESSES } from "../../../../../lib/constants";
import { DAO } from "../../../../database/methods";

const TransferCallback: EventHandlerCallback = async (
	event: TEventData,
	session?: ClientSession,
) => {
	try {
		const { transactionHash, returnValues } = event;
		const rawEventValue = returnValues as TTransferRawEvent;
		const eventValue = convertTransferRawEvent(rawEventValue)
		if (NULL_ADDRESSES.includes(eventValue.from)) {
			await DAO.nfts.InsertOneNft({
				token_id: eventValue.tokenId,
				owner_address: eventValue.to,
				mint_txid: transactionHash || "",
				create_at: new Date(),
				update_at: new Date()
			})
		}
	} catch (e) {
		throw e;
	}
};

export const Transfer = async (event: TEventData) =>
	EventHandler(event, TransferCallback);