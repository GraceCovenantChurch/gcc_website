var express = require('express');
var router = express.Router();

var data = [
  {
    "pic" : "ma1.jpg",
    "title" : "Announcement 1",
    "description" : "hello world 1"
  },
  {
    "pic" : "ma2.jpg",
    "title" : "Announcement2",
    "description" : "hello world 2"
  },
  {
    "pic": "ma3.jpg",
    "title" : "Announcement3",
    "description" : "hello world 3"
  }
]

router.route('/')
.get(function (request, response) {
  console.log("request for data");
  response.json(data);
});

module.exports = router;
