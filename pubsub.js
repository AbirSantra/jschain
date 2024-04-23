const redis = require("redis");
const { BlockchainInstance } = require("./blockchain");

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
    this.subscriber.on("message", (channel, chain) => {
      this.handleChain(channel, chain);
    });
  }

  handleChain(channel, chain) {
    console.log(`Chain broadcast received.`);
    const parsedChain = JSON.parse(chain);

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parsedChain);
    }
  }

  publish({ channel, chain }) {
    this.publisher.publish(channel, chain);
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      chain: JSON.stringify(this.blockchain.chain),
    });
  }
}

const PubSubInstance = new PubSub({ blockchain: BlockchainInstance });

module.exports = { PubSub, PubSubInstance };
