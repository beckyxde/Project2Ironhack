const express = require('express');
const router = express.Router();

// /user
router.get('/', (req, res, next) => {
  //req.user <-- current user  
  res.render('homepage');
});


// /user/profile
router.get('/search', (req, res, next) => {
  //req.user <-- current user  
  res.render('search');
});

module.exports = router;
