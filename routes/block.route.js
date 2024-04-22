const express = require("express");
const { getBlocks } = require("../controllers/block.controller");

const blockRouter = express.Router();

blockRouter.get("/blocks", getBlocks);

module.exports = blockRouter;
