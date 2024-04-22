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
    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}\tMessage: ${message}`);
    const parsedMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }
}

const PubSubInstance = new PubSub({ blockchain: BlockchainInstance });

module.exports = { PubSub, PubSubInstance };
