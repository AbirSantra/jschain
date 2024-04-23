const express = require("express");
const blockRouter = require("./routes/block.route.js");
const { ApiErrorHandler } = require("./apiError.js");
const { PubSubInstance } = require("./pubsub.js");
const { syncChains } = require("./syncChain.js");

const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api/block", blockRouter);

// Handlers
app.use(ApiErrorHandler);

// Listeners
const DEFAULT_PORT = 5001;
let PEER_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, async () => {
  console.log(`Server running on PORT: ${PORT}`);
  await syncChains({ address: ROOT_NODE_ADDRESS });
});

setTimeout(() => {
  PubSubInstance.broadcastChain();
}, 1000);
