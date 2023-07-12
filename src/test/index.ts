import { FIRST_NFT_CONTRACT_ADDRESS } from "../config"
import { FIRST_NFT_CONTRACT_ABI } from "../infra/blockchain/contracts/first_nft/abi"
import { web3 } from "../infra/blockchain/web3"

(async() => {
    try {
        const first_nft_contract = new web3.eth.Contract(FIRST_NFT_CONTRACT_ABI, FIRST_NFT_CONTRACT_ADDRESS)
        const events = await first_nft_contract.getPastEvents('allEvents',{ fromBlock: 9315895, toBlock: 9316894})
        console.log(events)
    } catch (e) {
        throw e
    }
})()