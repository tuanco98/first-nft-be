import { FastifyRequest } from "fastify";
import { DAO } from "../../infra/database/methods";
import { PagingParams } from "../../lib/paging";
import { ERROR_CODE, ErrMsg, StandardResponse } from "../../lib/error_handler";

type InputParams = {
  chain_network: string;
} & PagingParams;
export const list_collection_get = async (
  request: FastifyRequest
) => {
  try{
    const { page = 0, pageSize = 100 } = request.query as InputParams;
    const [total, data] = await Promise.all([
      DAO.collection_info.GetTotal({}),
      DAO.collection_info.GetAllCollections( page, pageSize)
    ])
    return StandardResponse({total, data}, 'Success!');
  }
  catch(e: any){
    return StandardResponse(null, e.message);
  }
};
