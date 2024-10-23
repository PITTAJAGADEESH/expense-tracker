const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const summaryRoutes = require("./routes/summary");
const errorHandler = require("./errorHandler");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/summary", summaryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
