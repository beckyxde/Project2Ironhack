// const express = require("express");
// const router = express.Router();
// const mongo = require("mongodb");
// const assert = require("assert")
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// const url = "mongodb://localhost:3000/Project2Ironhack"

// router.get("/profile", ensureLoggedIn("/signup"), (req, res, next) => {
//   //req.user <-- current user
//   console.log("req useer", req.user);
//   res.render("profile");
// });

// router.get('/', function(req, res, next) {
//   res.render('users');
// });

// router.get('/users', function(req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null,err);
//     var cursor = db.collection('users').find();
//     cursor.forEach(function(doc,err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function() {
//       res.render('profile', {users: resultArray});
//     });
//   });
// });

// router.post('/insert', function(req, res, next) {
//   var item = {
//     name: req.body.name
//   }

// mongo.connect(url, function(err, db) {
//   assert.equal(null, err);
//   db.collection('users').insertOne(item, function(err, result) {
//     assert.equal(null, error);
//   });
// });
