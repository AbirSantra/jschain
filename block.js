const { GENESIS_DATA, MINE_RATE } = require("./config");
const { cryptoHash } = require("./crypto-hash");
const hexToBinary = require("hex-to-binary");

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
    let { difficulty } = prevBlock;

    let hash,
      timestamp,
      nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        block: prevBlock,
        timestamp: timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new this({
      timestamp: timestamp,
      prevHash: prevHash,
      hash: hash,
      nonce: nonce,
      difficulty: difficulty,
      data: data,
    });
  }

  static adjustDifficulty({ block, timestamp }) {
    const { difficulty } = block;

    if (difficulty < 1) {
      return 1;
    }

    const difference = timestamp - block.timestamp;
    if (difference > MINE_RATE) {
      return difficulty - 1;
    }

    return difficulty + 1;
  }
}

module.exports = Block;
