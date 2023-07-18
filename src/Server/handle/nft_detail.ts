import { FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";

type InputParams = {
  token_id: number;
};
export const nft_detail = async (request: FastifyRequest) => {
  try {
    const { token_id } = request.query as InputParams;
    if ( !token_id ) {
      throw ErrMsg(ERROR_CODE.MISSING_PARAMS, "token id");
    }
    const fetch_data = await DAO.nfts.GetOneNFTInfo( token_id );
    return StandardResponse(fetch_data, "Success!");
  } catch (e: any) {
    return StandardResponse(null, e?.message);
  }
};
