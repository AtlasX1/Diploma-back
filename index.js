const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();
const initServer = () => {
  const app = express();
  app.use(cors());
  app.get("/", (req, res) => {
    res.end("Server is running!");
  });
  app.use("/api/test", require("./server/routes/test.routes"));

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
  });
};
mongoose.connect(
  process.env.MONGO_DB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to db");

    initServer();
  }
);
