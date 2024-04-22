const { ApiResponseHandler } = require("../apiResponse.js");
const { BlockchainInstance } = require("../blockchain.js");

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
