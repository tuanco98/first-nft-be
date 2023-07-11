import {Collection, MongoClient} from 'mongodb'
import { Nft } from './models/model.nft';
import { MONGO_URI } from '../../config';
import { NFT_inf } from './models/model.nft_inf';

const client = new MongoClient(MONGO_URI);
let dbo
export let CollectionNft: Collection<Nft>
export let CollectionNft_inf: Collection<NFT_inf>

export async function connectMongoDb(){
    /*
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     */
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('mongo connected')
        dbo = client.db("Phuonq")
        CollectionNft = dbo.collection("NFT")
        CollectionNft_inf = dbo.collection("NFT_inf")
        // await InsertInToCollection({name: 'aaa', address:'0x'})
    } catch (e) {
        console.error(e);
    }
}
