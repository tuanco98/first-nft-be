import { collections } from "../connect";

const getDAO = () => ({
	common: collections.contract_events,
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getContractEventDAO, DAOType as ContractEventType };
