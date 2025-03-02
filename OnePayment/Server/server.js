const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.VITE_GATEWAY_PORT  || 5000; 

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
  });
}

module.exports = app;
