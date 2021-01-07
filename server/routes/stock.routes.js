const Router = require("express");
const router = Router();
const Stock = require("../models/Stock");
const auth = require("../../middleware/auth.middleware");

router.post("/new", auth, async (req, res) => {
  try {
    const stock = new Stock({ ...req.body, owner: req.user.userId });
    await stock.save();

    res.status(201).json({ stock });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const stock = await Stock.find({ owner: req.user.userId });

    res.json(stock);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
