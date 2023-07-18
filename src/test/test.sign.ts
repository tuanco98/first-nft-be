import { PRIVATE_KEY } from "../config";
import { connectWeb3, web3 } from "../infra/blockchain/web3";
import { verifySignature } from "../lib/utils";

(async () => {
  try {
    connectWeb3()
    const message = new Date().getTime().toString();
    console.log(await web3.eth.getBlockNumber());
    const sign = web3.eth.accounts.sign(message, PRIVATE_KEY);
    console.log(sign);
    //const recover = web3.eth.accounts.recover(message,sign.signature);
    console.log(
      verifySignature(
        "0x3C1aD9554d7700B39359E1665b4b11B29aAdD665",
        message,
        sign.signature
      )
    );
  } catch (e) {
    console.log(e);
  }
})();
