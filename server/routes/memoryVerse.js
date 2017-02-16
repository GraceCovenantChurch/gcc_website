var express = require('express');
var router = express.Router();

var data =
[
  {
    "verse" : "Jesus Christ is the same yesterday and today and forever.",
    "reference" : "Hebrews 13:8",
    "pic" : "mv.jpg"
  }
]
router.route('/')
.get(function (request, response) {
  console.log("request for mv");
  response.json(data);
});

module.exports = router;
