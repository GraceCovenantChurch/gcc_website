var express = require('express');
var router = express.Router();

var data = [
  {
    "pic" : "ma1.jpg",
    "title" : "Welcome",
    "description" : "Sunday Service @ 11:15am – Meyerson Hall (34th and Walnut)"
  },
  {
    "pic" : "ma2.jpg",
    "title" : "Sign Up For Family Groups",
    "description" : "You haven't checked out GCC unless you've checked out our family groups >"
  },
  {
    "pic": "ma3.jpg",
    "title" : "Crossroad Retreat",
    "description" : "Click here to sign up for Crossroads Retreat!"
  }
]

router.route('/')
.get(function (request, response) {
  console.log("request for data");
  response.json(data);
});

module.exports = router;
