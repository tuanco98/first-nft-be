import { ClientSession } from "mongodb";
import { TEventData } from "../../../consume/consume.getPastEvent";
import { EventHandler, EventHandlerCallback } from "../../../helper";
import { TMintRawEvent } from "../event";

const MintCallback: EventHandlerCallback = async (
	event: TEventData,
	session?: ClientSession,
) => {
	try {
		const { transactionHash, returnValues } = event;
		const rawEventValue = returnValues as unknown as TMintRawEvent;
	} catch (e) {
		throw e;
	}
};

export const Mint = async (event: TEventData) =>
	EventHandler(event, MintCallback);