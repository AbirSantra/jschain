const express = require("express");
const blockRouter = require("./routes/block.route.js");
const { ApiErrorHandler } = require("./apiError.js");

const app = express();
const PORT = 5001;

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api/block", blockRouter);

// Handlers
app.use(ApiErrorHandler);

// Listeners
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
