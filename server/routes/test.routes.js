const Test = require("../models/test");
const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const test = new Test({
      name: "test name",
      number: 2,
    });

    await test.save();
    return res
      .status(200)
      .json({ message: "Test created successfully!", task });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Test.find({});
    if (!tasks) {
      return res.status(400).json({ message: "Tests not found, try again" });
    }
    return res.status(200).json({ tasks });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});
module.exports = router;
