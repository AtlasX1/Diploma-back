const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();
const initServer = () => {
  const app = express();
  app.use(cors());
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.end("Server is running!");
  });
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://atlasx1.github.io");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  });
  // app.use("/api/test", require("./server/routes/test"));
  app.use("/api/substance", require("./server/routes/substance"));
  app.use("/api/substance", require("./server/routes/getInfo"));

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
  });
};
mongoose.connect(
  process.env.MONGO_DB,
  // "mongodb+srv://serhii:qwaszx@cluster0.jdigr.gcp.mongodb.net/HealInfo?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to db");

    initServer();
  }
);
