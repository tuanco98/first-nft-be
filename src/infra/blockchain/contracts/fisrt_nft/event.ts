import { AllString } from "../../helper";

enum EventsName {
	Mint = "Mint",
}

type TMintEvent = {
	id: string;
	copier: string;
	reason: string;
};

type TMintRawEvent = AllString<TMintEvent>;

const convertCopyFailedRawEvent = (raw_event: TMintRawEvent) => {
	const event: TMintEvent = {
		id: raw_event.id,
		copier: raw_event.copier,
		reason: raw_event.reason,
	};
	return event;
};


export {
    TMintRawEvent,
	convertCopyFailedRawEvent,
	EventsName as MintEventName,
};
