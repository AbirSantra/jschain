const express = require("express");
const blockRouter = require("./routes/block.route.js");
const { ApiErrorHandler } = require("./apiError.js");

const app = express();
const PORT = 5001;

app.use("/api/block", blockRouter);

app.use(ApiErrorHandler);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
