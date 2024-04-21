const { cryptoHash } = require("./crypto-hash");

const timestamp = new Date("27-May-2001");
const prevHash = null;
const data = "This is the genesis block for jsChain";

const GENESIS_DATA = {
  timestamp: timestamp,
  prevHash: prevHash,
  hash: cryptoHash(timestamp, prevHash, data),
  data: data,
};

module.exports = { GENESIS_DATA };
