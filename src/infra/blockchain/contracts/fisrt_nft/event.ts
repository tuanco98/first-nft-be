import { AllString } from "../../helper";

enum EventsName {
	Mint = "Mint",
}

type TMintEvent = {
	id: string;
	copier: string;
	reason: string;
};

type TFirstNftRawEvent = AllString<TMintEvent>;

const convertCopyFailedRawEvent = (raw_event: TFirstNftRawEvent) => {
	const event: TMintEvent = {
		id: raw_event.id,
		copier: raw_event.copier,
		reason: raw_event.reason,
	};
	return event;
};


export {
	convertCopyFailedRawEvent,
	EventsName as MintEventName,
};
