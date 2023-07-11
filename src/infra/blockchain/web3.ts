import Web3 from "web3"
import { FIRST_NFT_CONTRACT_ADDRESS, WEB3_PROVIDER } from "../../config"
import { FIRST_NFT_CONTRACT_ABI } from "./contracts/fisrt_nft/abi"

export const web3 = new Web3(WEB3_PROVIDER)
export const Contract = {
    FIRST_NFT_CONTRACT: new web3.eth.Contract(FIRST_NFT_CONTRACT_ABI, FIRST_NFT_CONTRACT_ADDRESS)
}