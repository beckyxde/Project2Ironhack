const mongoose = require("mongoose");
mongoose();

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');



}, false);


function likeThis($this) {
  console.log('button clicked');
  console.log('thissssss', $this.id);
  // const selfie_data = $this.id;
  $this.style.display = 'none';
  // console.log('data: ' + selfie_data);
  // // console.log('user: ' + user_data);
  axios.post('/search', { eventId: $this.id }).then(response => {
    console.log(response);
  });
};

const databaseID = mongo.user.starred_events
