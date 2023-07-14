import { FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { PagingParams } from "../../lib/paging";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";

type InputParams = {
  create_at: Date;
} & PagingParams;
export const nft_mint_greate_or_equal_at_time_get = async (
  request: FastifyRequest
) => {
  try{
    const { create_at, page, pageSize } = request.query as InputParams;
    if( !create_at ){
      throw ErrMsg(ERROR_CODE.MISSING_PARAMS, 'create at');
    }
    const fetch_data = await DAO.nfts.GetNFTByTime(
      Number(create_at),
      page,
      pageSize
    );
    return StandardResponse( fetch_data, 'Success!');
  }
  catch( e: any ){
    return StandardResponse(null, e.message);
  }
};