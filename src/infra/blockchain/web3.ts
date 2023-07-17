import Web3 from "web3"
import { WEB3_PROVIDER } from "../../config"

const httpProvider = new Web3.providers.HttpProvider(WEB3_PROVIDER);

export const web3 = new Web3(httpProvider)
