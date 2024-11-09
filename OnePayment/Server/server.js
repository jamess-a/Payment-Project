const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; 
