import { Filter } from "mongodb";
import { ICollection } from "../models/model.collection";
import { collections } from "../mongo";

const getDAO = () => ({
  common: collections.collection_info,
  GetOneCollectionInfo: (address: string) => {
    return collections.collection_info.findOne({ address });
  },
  GetAllCollections: ( page = 0, pageSize = 10) => {
    return collections.collection_info
      .find({})
      .limit(page)
      .skip(page * pageSize)
      .toArray();
  },
  GetTotal: (filter: Filter<ICollection>) => {
    return collections.collection_info.countDocuments(filter);
  },
});

type DAOType = ReturnType<typeof getDAO>;

export { getDAO as getCollectionInfoDAO, DAOType as CollectionInfoType };
