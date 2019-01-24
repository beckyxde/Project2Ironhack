const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  //req.user <-- current user  
  res.render('homepage');
});

module.exports = router;
