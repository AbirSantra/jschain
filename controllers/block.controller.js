const { ApiResponseHandler } = require("../apiResponse.js");
const { BlockchainInstance } = require("../blockchain.js");
const { fieldExtractor } = require("../fieldsExtractor.js");

exports.getBlocks = async (req, res, next) => {
  try {
    ApiResponseHandler({
      res: res,
      status: 200,
      message: `Successfully retreived blocks!`,
      data: BlockchainInstance.chain,
    });
  } catch (error) {
    next(error);
  }
};

exports.addBlock = async (req, res, next) => {
  try {
    const { data } = fieldExtractor(req.body, ["data"]);

    BlockchainInstance.addBlock({ data: data });

    ApiResponseHandler({
      res: res,
      status: 200,
      message: `Successfully added block to chain!`,
      data: BlockchainInstance.chain,
    });
  } catch (error) {
    next(error);
  }
};
