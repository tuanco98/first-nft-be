import { ClientSession } from "mongodb";
import { IContractEvent } from "../models/model.contract_event";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.contract_events,
  InsertOneContractEventConsume: (
    contract_event: IContractEvent,
    session?: ClientSession
  ) => {
    return collections.contract_events.updateOne(
      { txid: contract_event.txid, logIndex: contract_event.logIndex },
      { $setOnInsert: contract_event },
      { session, upsert: true }
    );
  },
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getContractEventDAO, DAOType as ContractEventType };
