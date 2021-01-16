const Router = require("express");
const router = Router();
const Profit = require("../models/Profit");
const auth = require("../../middleware/auth.middleware");

router.post("/profit", auth, async (req, res) => {
  try {
    const profit = new Profit({ ...req.body, owner: req.user.userId });
    await profit.save();

    res.status(201).json({ profit });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const profit = await Profit.find({ owner: req.user.userId });

    res.json(profit);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
