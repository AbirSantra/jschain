const { cryptoHash } = require("./crypto-hash");

// Calculate the Unix Epoch timestamp for May 27, 2001
const timestamp = Date.UTC(2001, 4, 27);

// Define prevHash as null since this is the genesis block
const prevHash = null;

// Initial Data for Genesis block
const data = "This is the genesis block for JSChain. Created by Abir Santra.";

// Generate hash for the genesis block
const hash = cryptoHash(timestamp, prevHash, data);

const GENESIS_DATA = {
  timestamp: timestamp,
  prevHash: prevHash,
  hash: hash,
  data: data,
};

module.exports = { GENESIS_DATA };
