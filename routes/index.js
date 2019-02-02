const express = require("express");
const router = express.Router();
const axios = require("axios");

// /user
router.get("/", (req, res, next) => {
  //req.user <-- current user
  res.render("homepage");
});

// /user/profile

router.get("/profile", (req, res, next) => {
  //req.user <-- current user
  res.render("profile");
});

router.get('/search', (req, res, next) => {
  //req.user <-- current user  
  res.render('search', TicketmasterApi);
});



const TicketmasterApi = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=boIcIcsSdL2nZNv2REinhtAMqJaOELBH&city=NewOrleans&classificationName=indie'
});

function getEventInfo(theName) {
  TicketmasterApi.get(theName)
    .then(responseFromAPI => {
      removeErrDiv();
      const events = {
        name: responseFromAPI.events.name[0],
        genre: responseFromAPI.events.classifications.genre.name[0]
      };
    });
};

const events = {
  name: responseFromAPI.events.name[0],
  genre: responseFromAPI.events.classifications.genre.name[0]
};

TicketmasterApi.get(`${stockTicket}/chart`)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

module.exports = router;
