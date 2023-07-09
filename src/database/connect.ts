import {Collection, MongoClient, ObjectId} from 'mongodb'
import { Nft } from './models/model.nft';
import { MONGO_URI } from '../config';

const client = new MongoClient(MONGO_URI);
let dbo
export let CollectionNft: Collection<Nft>

export async function Connect(){
    /*
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     */
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('mongo connected')
        dbo = client.db("Phuonq")
        CollectionNft = dbo.collection("NFT")
        // await InsertInToCollection({name: 'aaa', address:'0x'})
    } catch (e) {
        console.error(e);
    }
}
