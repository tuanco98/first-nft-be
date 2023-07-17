import { Decimal128, IndexDescription } from "mongodb";

export type ILogType = {
  id?: string;
  address?: string;
  topics?: string[];
  data?: string;
  blockNumber?: number;
  transactionHash?: string;
  transactionIndex?: number;
  blockHash?: string;
  logIndex?: number;
  removed?: boolean;
};

export type ITransactionsReceipt = {
  transactionHash: string;
  transactionIndex: number;
  block_hash: string;
  block_number: number;
  from: string;
  to: string;
  cumulativeGasUsed : Decimal128;
  gasUsed: Decimal128;
  effectiveGasPrice?: Decimal128;
  contractAddress?: string;
  logs: ILogType[];
  logsBloom: string;
  root: string;
  status: number;
  type?: number;
  transaction_at: Date;
  create_at: Date; 
}

export const TransactionsIndex : IndexDescription[] = [
  { key: { transactionHash: 1 }, unique: true, background: true },
  { key: { block_number: 1 }, background: true },
  { key: { from: 1 }, background: true },
];
