const express = require("express");
const router = express.Router();
const axios = require("axios");
const document = "";

// /user
router.get("/", (req, res, next) => {
  //req.user <-- current user
  res.render("homepage");
});

// router.get("/?genre=rock", (req, res, next) => {
//   //req.user <-- current user
//   res.render("search?genre={{clas");
// });

// /user/profile

router.get("/profile", (req, res, next) => {
  //req.user <-- current user
  console.log("req useer", req.user)
  res.render("profile");
});

router.get("/search", (req, res, next) => {
  //req.user <-- current user
  console.log("GENREEEE", req.query.genre);
  let requestString = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
    process.env.clientId +
    "&keyword=" +
    req.query.genre +
    " Berlin"
  console.log(requestString)
  axios
    .get(
      requestString
    )
    .then(responseFromAPI => {
      responseFromAPI.data._embedded.events.map((event, i) => {
        console.log(i, event)
      }
      );
      res.render("search", { events: responseFromAPI.data._embedded.events });
    })
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
