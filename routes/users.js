const express = require("express");
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("all good. your data has been submitted");
  }
);

module.exports = router;
