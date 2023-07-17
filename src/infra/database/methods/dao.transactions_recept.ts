import { ITransactionsReceipt } from "../models/model.transaction";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.transactions_receipt,
  InsertOneTransaction: (transaction: ITransactionsReceipt) => {
    return collections.transactions_receipt.insertOne(transaction);
  },
});
type DAOType = ReturnType<typeof getDAO>;
export { getDAO as transactionReceiptDAO, DAOType as ITransactionType };
