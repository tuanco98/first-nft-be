import { AllString } from "../../helper";

enum EventsName {
	Transfer = "Transfer",
}

type TTransferEvent = {
	from: string;
	to: string;
	tokenId: number;
};

type TTransferRawEvent = AllString<TTransferEvent>;

const convertTransferRawEvent = (raw_event: TTransferRawEvent) => {
	const event: TTransferEvent = {
		from: raw_event.from,
		to: raw_event.to,
		tokenId: Number(raw_event.tokenId),
	};
	return event;
};


export {
    TTransferRawEvent,
	convertTransferRawEvent,
	EventsName as TransferEventName,
};
