const Block = require("./block");
const { cryptoHash } = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newMinedBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data: data,
    });
    this.chain.push(newMinedBlock);
  }

  static isValidChain(chain) {
    // Check if the genesis block is valid
    const genesisIsValid =
      JSON.stringify(chain[0]) === JSON.stringify(Block.genesis());
    console.log("Chain[0]: ", JSON.stringify(chain[0]));
    console.log("Genesis: ", JSON.stringify(Block.genesis()));
    if (!genesisIsValid) {
      console.error("Chain validation failed! Genesis Block is not valid!");
      return false;
    }

    // Iterate over each block excluding the genesis block
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const prevBlock = chain[i - 1];

      // Check if current block's prevHash matches the prevBlock's hash
      if (currentBlock.prevHash !== prevBlock.hash) {
        console.error("Chain validation failed! Prev hash does not match!");
        return false;
      }

      // Check if the current blocks hash is valid
      const validatedHash = cryptoHash(
        currentBlock.timestamp,
        currentBlock.prevHash,
        currentBlock.nonce,
        currentBlock.difficulty,
        currentBlock.data
      );
      if (currentBlock.hash !== validatedHash) {
        console.error("Chain validation failed! Current hash is not valid!");
        return false;
      }

      // Check if difficulty adjustment is valid
      const difficultyDifference = Math.abs(
        prevBlock.difficulty - currentBlock.difficulty
      );
      if (difficultyDifference > 1) {
        console.error(
          "Chain validation failed! Difficulty adjustment is invalid for block: ",
          i
        );
        return false;
      }
    }

    return true;
  }

  replaceChain(chain) {
    // Check if the current chain is longer
    if (this.chain.length >= chain) {
      console.error("Target chain is shorter than existing chain!");
      return;
    }

    // Check if target chain is valid
    if (!Blockchain.isValidChain(chain)) {
      console.error("Target chain is not valid!");
      return;
    }

    // All checks passed. Replace the existing chain with target chain
    this.chain = chain;
  }
}

const BlockchainInstance = new Blockchain();

module.exports = { Blockchain, BlockchainInstance };
