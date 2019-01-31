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

router.get("/search", (req, res, next) => {
  //req.user <-- current user
  res.render("search", TicketmasterApi);
});

// index.js

let errDiv;

const TicketmasterApi = axios.create({
  baseURL:
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=boIcIcsSdL2nZNv2REinhtAMqJaOELBH&city=NewOrleans&classificationName=indie"
});

function getEventInfo(theName) {
  TicketmasterApi.get(theName).then(responseFromAPI => {
    removeErrDiv();
    const events = {
      name: responseFromAPI.events.name[0],
      genre: responseFromAPI.events.classifications.genre.name[0]
    };
  });
}
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

// function createDiv() {
//         errDiv = document.createElement("div");
//         errDiv.setAttribute("id", "error");
//         document.body.appendChild(errDiv);
//       }

// function removeErrDiv() {
//         if (document.getElementById("error")) {
//           const error = document.getElementById("error");
//           error.parentNode.removeChild(error);
//         }
//       }

// function removeCountryInfo() {
//         document.getElementById("countryName").innerHTML = "";
//         document.getElementById("countryCapital").innerHTML = "";
//       }

// function checkInput() {
//         removeErrDiv();
//         if (document.getElementById("theInput").value === "") {
//           document.getElementById('theButton').disabled = true;
//           removeCountryInfo();
//           createDiv();
//           const theErr = document.createTextNode(`Wanna input something? 🤪`);
//           errDiv.appendChild(theErr);
//         } else {
//           document.getElementById('theButton').disabled = false;
//         }
//       }

// document.getElementById("theButton").onclick = function () {
//         removeErrDiv();
//         const country = document.getElementById("theInput").value;
//   //         getCountryInfo(country);
// }

module.exports = router;
