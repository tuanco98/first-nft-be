import { Contract, Log, TransactionReceipt } from "web3";
import { ABI } from "./ABI";
import { FIRST_NFT_CONTRACT_ADDRESS, PRIVATE_KEY } from "../config";
import { web3 } from "../infra/blockchain/web3";
import { ILogType, ITransactionsReceipt } from "../infra/database/models/model.transaction";
import { Decimal128 } from "mongodb";
import { connectMongo } from "../infra/database/mongo";
import { DAO } from "../infra/database/methods";

export const contract = new Contract(ABI, FIRST_NFT_CONTRACT_ADDRESS, web3);
//get owner of nft
export const get_owner_of_nft = async () =>
{
    const owner_of_nft = await contract.methods.ownerOf(2).call();

    console.log(owner_of_nft)
}
const account = web3.eth.accounts.wallet.add(PRIVATE_KEY);



export const mint_nft = async () => {
  try {
    await connectMongo();
    const test = await DAO.transaction_receipt.common.findOne({})
    console.log({test})
    const quantity = BigInt(1);  
    const from = account[0].address
    const gasPrice = await web3.eth.getGasPrice()
    const nonce = await web3.eth.getTransactionCount(from)
    const data = contract.methods.mint(quantity).encodeABI()
    const options = {
      from,
      to: FIRST_NFT_CONTRACT_ADDRESS,
      value: web3.utils.toWei("0.3", "ether"),
      nonce,
      gasPrice,
      data,
  }
    const estimatedGas = await web3.eth.estimateGas(options)
    console.log({estimatedGas})
    const signed = await web3.eth.accounts.signTransaction({...options, gas: estimatedGas}, PRIVATE_KEY)
    console.log({signed})
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log(receipt)
    const receipt_ = convert_receipt(receipt)
    await DAO.transaction_receipt.InsertOneTransaction(receipt_)
    console.log('insert done');
    
    return receipt
  } catch (error) {
    console.log(error);
  }
};
mint_nft();

const convert_log_type = (logs: Log[]): ILogType[] => {
  return logs.map(el=> {
    return {
    ...el,
    //convert topic
    topics: el.topics?.map(topic => topic.toString()),
    data: el.data?.toString(),
    blockNumber: Number(el.blockNumber),
    transactionHash: el.transactionHash?.toString(),
    transactionIndex: Number(el.transactionIndex),
    blockHash: el.blockHash?.toString(),
    logIndex: Number(el.logIndex),
  }
  }) 
}
export const convert_receipt = (receipt: TransactionReceipt): ITransactionsReceipt => {
 return {
  ...receipt,
  transactionHash: receipt.transactionHash?.toString(),
  transactionIndex: Number(receipt.transactionIndex),
  block_hash: receipt.blockHash?.toString(),
  block_number: Number(receipt.blockNumber),
  cumulativeGasUsed: new Decimal128(receipt.cumulativeGasUsed?.toString()),
  effectiveGasPrice: receipt.effectiveGasPrice ? new Decimal128(receipt.effectiveGasPrice?.toString()) : undefined,
  gasUsed: new Decimal128(receipt.gasUsed.toString()),
  //convert LogType
  logs: convert_log_type(receipt.logs),
  logsBloom: receipt.logsBloom?.toString(),
  root: receipt.root?.toString(),
  status: Number(receipt.status),
  type: Number(receipt.type),
  transaction_at: new Date(),
  create_at: new Date(),
 }
};
