const express = require("express");
const router = express.Router();
const axios = require("axios");
const document = "";

// const getEventInfo = require("");
// const events = {
//   name: responseFromAPI.events.name[0],
//   genre: responseFromAPI.events.classifications.genre.name[0]
// };

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


// router.get("/search", (req, res, next) => {
//   //req.user <-- current user
//   res.render("search", TicketmasterApi);
// });

router.get("/search", (req, res, next) => {
  //req.user <-- current user
  console.log("GENREEEE", req.query.genre);
  TicketmasterApi.get()
    .then(responseFromAPI => {
      responseFromAPI.data._embedded.events.map((event, i) =>
        console.log(i, event.classifications)
      );
      res.render("search", { events: responseFromAPI.data._embedded.events });

      // removeErrDiv();
      // const eventGenre = responseFromAPI.data[0];
      // const eventName = responseFromAPI.data[0];

      // document.getElementById("eventGenre").innerHTML = eventGenre;
      // document.getElementById("eventName").innerHTML = "Name: " + eventName;
    })
    .then(eventData => { });
});

// index.js

let errDiv;

const TicketmasterApi = axios.create({
  baseURL:
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=boIcIcsSdL2nZNv2REinhtAMqJaOELBH"
});

function getEventInfo(theName) {
  TicketmasterApi.get()
    .then(responseFromAPI => {
      responseFromAPI.data._embedded.events.map((event, i) =>
        console.log(i, event.classifications)
      );

      return responseFromAPI.data._embedded.events;
      // removeErrDiv();
      // const eventGenre = responseFromAPI.data[0];
      // const eventName = responseFromAPI.data[0];

      // document.getElementById("eventGenre").innerHTML = eventGenre;
      // document.getElementById("eventName").innerHTML = "Name: " + eventName;
    })

    .catch(err => {
      if (err.response.status === 404) {
        removeEventInfo();
        createDiv();
        const theErr = document.createTextNode(
          `What the heck is ${theName}? 🤭`
        );
        errDiv.appendChild(theErr);
      } else {
        console.log("err => ", err);
      }
    });
}

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
