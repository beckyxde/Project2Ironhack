const express = require("express");
const router = express.Router();

// /user
router.get("/", (req, res, next) => {
  //req.user <-- current user
  res.render("homepage");
});

// /user/search
router.get("/search", (req, res, next) => {
  //req.user <-- current user
  res.render("search");
});

// /user/profile
router.get("/profile", (req, res, next) => {
  //req.user <-- current user
  res.render("profile");
});

module.exports = router;
