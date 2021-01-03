const Router = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = Router();
const jwtSecret = "DomininSecretString";

router.post(
  "/register",
  [
    check("email", "Неверный формат почты").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
    check("name", "Введите имя").not().isEmpty(),
    check("surname", "Введите фамилию").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "wrong register data" });
      }

      const { email, password, name, surname } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          errors: [
            { msg: "Пользователь с такой почтой существует", param: "email" },
          ],
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword, name, surname });
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
    check("email", "Неверный формат почты").isEmail(),
    check("password", "Введите пароль").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "wrong auth data" });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(500).json({
          errors: [{ msg: "Неверный логин", param: "email" }],
          message: "Неверный логин",
        });
      }

      const isMatchPass = await bcrypt.compare(password, user.password);

      if (!isMatchPass) {
        return res.status(400).json({
          errors: [{ msg: "Неверный пароль", param: "password" }],
          message: "Неверный пароль",
        });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({
        token,
        userId: user.id,
        userName: user.name,
        userSurname: user.surname,
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
