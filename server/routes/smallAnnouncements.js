var express = require('express');
var router = express.Router();

var data = ["Family Group is where you can grow in Christ as you study the Word, pray, and fellowship together with a small group of brothers and sisters in Christ. Please sign up online for our fall family groups!",
"Please continue to join AMI for our daily devotionals at the AMI Quiet Times website. Download the Acts Ministries International mobile app (available on both the Google Play Store and the Apple App Store), and join us in staying close to the Father by remaining in His Word.",
"Morning prayer is held on Friday mornings at 7am in at Ralston House (36th & Chestnut St.)",
"Let’s keep praying for the Grace Covenant Church Singapore! Also check out their new website! Their Sunday services and small groups have started and they are reaching out to their community. Please consider building up God’s Kingdom in Singapore through your faith pledges, offerings and prayers. Please include your name on your check.",
"Please also continue to pray for our one-year missionary interns!"]

router.route('/')
.get(function (request, response) {
  console.log("request for small data");
  response.json(data);
});

module.exports = router;
