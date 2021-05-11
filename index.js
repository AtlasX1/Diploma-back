const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
require("dotenv").config();
const initServer = () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.end("Server is running!");
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
