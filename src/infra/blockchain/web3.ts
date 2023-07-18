import Web3, { ContractAbi } from "web3"
import {Contract} from 'web3-eth-contract'
import { FIRST_NFT_CONTRACT_ADDRESS, WEB3_PROVIDER } from "../../config"
import { FIRST_NFT_CONTRACT_ABI } from "./contracts/first_nft/abi"

export let web3: Web3
export let first_nft_contract: Contract<ContractAbi>

export const connectWeb3 = () => {
    const httpProvider = new Web3.providers.HttpProvider(WEB3_PROVIDER);
    web3 = new Web3(httpProvider)
    first_nft_contract = new web3.eth.Contract(FIRST_NFT_CONTRACT_ABI, FIRST_NFT_CONTRACT_ADDRESS)
}
