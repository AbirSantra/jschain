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
    if (!genesisIsValid) {
      return false;
    }

    // Iterate over each block excluding the genesis block
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const prevBlock = chain[i - 1];

      // Check if current block's prevHash matches the prevBlock's hash
      if (currentBlock.prevHash !== prevBlock.hash) {
        return false;
      }

      // Check if the current blocks hash is valid
      const validatedHash = cryptoHash(
        currentBlock.timestamp,
        currentBlock.prevHash,
        currentBlock.data
      );
      if (currentBlock.hash !== validatedHash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
