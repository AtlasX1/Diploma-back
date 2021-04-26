import express from "express";
import { connect } from "mongoose";

import cors from "cors";

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
connect(
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
