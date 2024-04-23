const axios = require("axios");
const { BlockchainInstance } = require("./blockchain");

exports.syncChains = async ({ address }) => {
  try {
    console.log("Syncing Chain...");
    const response = await axios.get(`${address}/api/block/blocks`);
    const rootChain = response.data.data;
    BlockchainInstance.replaceChain(rootChain);
    console.log(`Synced Chain: ${JSON.stringify(rootChain)}`);
  } catch (error) {
    next(error);
  }
};
