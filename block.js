const { GENESIS_DATA } = require("./config");
const { cryptoHash } = require("./crypto-hash");

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ prevBlock, data }) {
    const prevHash = prevBlock.hash;
    const { difficulty } = prevBlock;
    let hash,
      timestamp,
      nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timestamp: timestamp,
      prevHash: prevHash,
      hash: hash,
      nonce: nonce,
      difficulty: difficulty,
      data: data,
    });
  }
}

module.exports = Block;
