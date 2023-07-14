import { FastifyReply, FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { PagingParams } from "../../lib/paging";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";

type InputParams = {
  owner_address: string;
} & PagingParams;
export const list_nfts_get = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try{
    const { owner_address, page = 0, pageSize = 10 } = request.query as InputParams;
    if(!owner_address) throw ErrMsg(ERROR_CODE.MISSING_PARAMS, 'owner address');
    const [total, fetch_data] = await Promise.all([
      DAO.nfts.GetTotal({owner_address}),
      DAO.nfts.GetAllNFT(owner_address, page, pageSize)
    ])
    return StandardResponse([total, fetch_data], 'Success!');
  }
  catch(e: any){
    return StandardResponse(null, e.message);
  }
};
