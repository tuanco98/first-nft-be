import { Filter } from "mongodb";
import { ICollection } from "../models/model.collection";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.collection_info,
  GetOneCollectionInfo: (contract_address: string) => {
    return collections.collection_info.findOne({ contract_address });
  },
  GetAllCollections: ( page: number, pageSize: number) => {
    return collections.collection_info
      .find({})
      .limit(pageSize)
      .skip(page * pageSize)
      .toArray();
  },
  GetTotal: (filter: Filter<ICollection>) => {
    return collections.collection_info.countDocuments(filter);
  },
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getCollectionInfoDAO, DAOType as CollectionInfoType };
