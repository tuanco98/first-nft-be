import { FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { PagingParams } from "../../lib/paging";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";
import { getAddressRecover, verifySignature } from "../../lib/utils";

type InputParams = PagingParams;
export const list_nfts_get = async (
  request: FastifyRequest
) => {
  try{
    const {  page = 0, pageSize = 10 } = request.query as InputParams;
    const { message, signature } = request.headers
    if(!message) throw ErrMsg(ERROR_CODE.MISSING_PARAMS, 'message');
    if(!signature) throw ErrMsg(ERROR_CODE.MISSING_PARAMS, 'signature');
    const owner_address =  getAddressRecover(message as string, signature as string)
    const [total, data] = await Promise.all([
      DAO.nfts.GetTotal({owner_address}),
      DAO.nfts.GetAllNFT(owner_address , page, pageSize)
    ])
    return StandardResponse({total, data}, 'Success!');
  }
  catch(e: any){
    return StandardResponse(null, e.message);
  }
};
