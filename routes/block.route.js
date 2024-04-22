const express = require("express");
const { getBlocks, addBlock } = require("../controllers/block.controller");

const blockRouter = express.Router();

blockRouter.get("/blocks", getBlocks);

blockRouter.post("/add", addBlock);

module.exports = blockRouter;
