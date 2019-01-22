const express = require('express');
const authRoutes  = express.Router();

const passport = require("passport")

// const bcrypt = require('bcrypt')
// const bcryptSalt = 10

authRoutes.get("/signup", (req, res, next) => {
  res.render("signup");
});

/*
authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
});
*/

authRoutes.post("/signup", passport.authenticate("local", {
  successRedirect: "/homepage",
  failureRedirect: "/signup",
  failureFlash: true,
  passReqToCallback: true
}));

//logout
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;