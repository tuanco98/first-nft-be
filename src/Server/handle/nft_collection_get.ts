import { FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";

type InputParams = {
  contract_address: string;
};
export const nft_collection_get = async (request: FastifyRequest) => {
  try {
    const { contract_address } = request.query as InputParams;
    if (!contract_address) throw ErrMsg(ERROR_CODE.MISSING_PARAMS, "contract_address");
    const fetch_data = await DAO.collection_info.GetOneCollectionInfo( contract_address );
    return StandardResponse(fetch_data, "Success!");
  } catch (e: any) {
    return StandardResponse(null, e?.message);
  }
};
