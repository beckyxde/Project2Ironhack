const express = require("express");
const router = express.Router();
const axios = require("axios");
const document = "";
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const User = require("../models/User");

// /user
router.get("/", (req, res, next) => {
  //req.user <-- current user
  console.log("THIS IS THE USER", req.user);
  res.render("homepage");
});

// router.get("/?genre=rock", (req, res, next) => {
//   //req.user <-- current user
//   res.render("search?genre={{clas");
// });

// /user/profile

router.get("/profile", ensureLoggedIn("/signup"), (req, res, next) => {
  //req.user <-- current user
  let promisesArr = []
  let secs = 0
  req.user.starred_events.forEach((eventId) => {
    let requestString =
      "https://app.ticketmaster.com/discovery/v2/events/" +
      eventId +
      ".json?apikey=" +
      process.env.clientId
    let promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log(
          "resolving"
        )
        console.log(requestString)
        resolve();
      }, secs);
      console.log(secs)
    }).then(() => {
      return axios.get(requestString)
    })
    promisesArr.push(promise)
    secs += 2000
  })

  // wait for all requests to be answered
  Promise.all(promisesArr).then((responses) => {
    let events = []
    responses.forEach((res) => {
      //console.log(res);
      events.push(res.data)
    })
    res.render("profile", { user: req.user, events: events });
  })

});

router.get("/search", ensureLoggedIn("/signup"), (req, res, next) => {
  //req.user <-- current user
  console.log("GENREEEE", req.query.genre);
  let requestString =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
    process.env.clientId +
    "&keyword=" +
    req.query.genre +
    " Berlin";
  console.log(requestString);
  axios.get(requestString).then(responseFromAPI => {
    responseFromAPI.data._embedded.events.map((event, i) => {
      console.log(i, event);
    });
    res.render("search", { events: responseFromAPI.data._embedded.events });
  });
});

router.post("/search", (req, res, next) => {
  console.log("EVENT ID FROM FRONTENDDDDDD", req.body.eventId);
  console.log("///wefauigelfhuawehalwa", req.user._id);
  User.update(
    { _id: req.user._id },
    { $addToSet: { starred_events: req.body.eventId } }
  ).then(x => {
    console.log("xxxxxxxxxxxxx", x);
  });
  res.send("up and running");
});


// index.js

let errDiv;

function createDiv() {
  errDiv = document.createElement("div");
  errDiv.setAttribute("id", "error");
  document.body.appendChild(errDiv);
}

function removeErrDiv() {
  if (document.getElementById("error")) {
    const error = document.getElementById("error");
    error.parentNode.removeChild(error);
  }
}

function removeEventInfo() {
  document.getElementById("eventGenre").innerHTML = "";
  document.getElementById("eventName").innerHTML = "";
}

function checkInput() {
  removeErrDiv();
  if (document.getElementById("theInput").value === "") {
    document.getElementById("theButton").disabled = true;
    removeEventInfo();
    createDiv();
    const theErr = document.createTextNode(`Wanna input something? 🤪`);
    errDiv.appendChild(theErr);
  } else {
    document.getElementById("theButton").disabled = false;
  }
}

// document.getElementById("theButton").onclick = function() {
//   removeErrDiv();
//   const events = document.getElementById("theInput").value;
//   getEventInfo(events);
// };
// const eventGenre = responseFromAPI.events.classifications.genre.name[0];
// const eventName = responseFromAPI.events.name[0];

//   // instead in the console, show data in the browser using JS DOM manipulation:
//   document.getElementById("resultsList").innerHTML = countryName;
//   document.getElementById("countryCapital").innerHTML = "Capital: " + countryCapital;
// // })
// .catch (err => {
//     if (err.response.status === 404) {
//       removeCountryInfo();
//       createDiv();
//       const theErr = document.createTextNode(`What the heck is ${theName}? 🤭`);
//       errDiv.appendChild(theErr);
//     } else {
//       console.log('err => ', err)
//     }
//       //   })
//     }

module.exports = router;
