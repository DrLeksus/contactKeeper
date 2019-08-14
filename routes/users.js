const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
// https://express-validator.github.io/docs/
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please enter a vaild email").isEmail(),
    check("password", "Please enter a strong password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send("all good. your data has been submitted");
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already taken" });
      }

      user = new User({ name, email, password });

      // const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, salt);

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) console.log("err", err);
          user.password = hash;
          console.log("hash", hash);
          user.save();
        });
      });

      // await user.save();

      res.send("User has been saved");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
