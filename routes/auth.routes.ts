import Router from "express";
import { check, validationResult } from "express-validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = Router();
const jwtSecret = "DomininSecretString";

interface Login {
  email: string;
  password: string;
}

router.post(
  "/register",
  [
    check("email", "wrong email").isEmail(),
    check("password", "min length 6").isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "wrong register data" });
      }

      const { email, password }: Login = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json("User created");
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "wrong auth data" });
      }

      const { email, password }: Login = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(500).json({ message: "user not found" });
      }

      const isMatchPass = await bcrypt.compare(password, user.password);

      if (!isMatchPass) {
        return res.status(400).json({ message: "wrong password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
