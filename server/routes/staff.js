var express = require('express');
var router = express.Router();

var data =
[
  {
    "name" : "Pastor Young Kim",
    "title" : "Senior Pastor of Grace Covenant Church in Philadelphia",
    "email" : "pastoryoung@gracecovenant.net",
    "description" : "After receiving his initial calling into ministry as a Bio-Engineer at the University of Illinois at Champaign-Urbana, he finished his Master of Divinity at Biblical Theological Seminary (1989-1992). " +
    "He also finished his Masters in Urban Missions at Westminster Theological Seminary (1995-1996). " +
    "In 1996, he planted Grace Covenant Church with a vision to be a multi-ethnic church that will raise kingdom workers for the harvest of the world to the glory of God. " +
    "God has blessed Pastor Young and his wife Annette with His precious gifts in Sarah, Daniel, and Isaiah. " +
    "“My prayer is that the Holy Spirit may empower me to love Jesus with all my heart, mind, strength and soul and to love others with the love of God.”",
    "pic" : "pyoung.jpg"
  },
  {
    "name" : "Pastor Kirt Thallman",
    "title" : "University City Site Pastor",
    "email" : "pastorkirt@gracecovenant.net",
    "description" : "Pastor Kirt received his Master of Divinity from Asbury Theological Seminary and graduated from the University of Akron with a degree in electronics. " +
    "Originally from Ohio, he became the pastor of House of Praise Bilingual Church in Taipei, Taiwan from 2000-2007. There he met his wife, Mei Lan. " +
    "Before coming to GCC, he was a pastor of the English Ministry at the Chinese Christian Church of Columbia, South Carolina from 2008-2011. " +
    "He loves worshipping the “True King Jesus” and being a husband to his wife and dad to his two children, Nathan and Naomi. " +
    "In his free time you will find him playing basketball and fixing unwanted things – “making the old new again.” " +
    "Some themes that reflect his heart are: “love God, love others”, “give & receive grace”, “be real & be healed”, “be interdependent not independent” and “my identity is in Christ”.",
    "pic" : "pkirt.jpg"
  },
  {
    "name" : "ChanMi Jung Pyles",
    "title" : "University City Staff",
    "email" : "chanmi@gracecovenant.net",
    "description" : "Born and raised in Seoul, South Korea, ChanMi has a passion in building up a local church where people from different backgrounds and cultures have a deep relationship with Christ and genuine fellowship with one another.  " +
    "ChanMi graduated from Korea University with a Bachelor’s degree in English and Spanish. " +
    "She then earned her master’s degree in Intercultural Communication from the Graduate School of Education at the University of Pennsylvania with a certificate in TESOL and worked as a teacher at a non-profit organization prior to joining the GCC staff. " +
    "She is currently pursuing a Masters in Divinity at Westminster Theological Seminary. " +
    "She is married to her husband, Brian Pyles, whom she calls “her best friend and partner in life and ministries.” " +
    "Brian and ChanMi have a daughter, Chaya, whose name means ‘full of life.’ " +
    "ChanMi loves having a good cup of latte with people and enjoys listening to what God is doing in people’s lives." +
    "ChanMi is also passionate about discipleship, worship, missions and simply ‘sharing the love of Christ.’",
    "pic" : "chanmi.jpg"
  },
  {
    "name" : "Intern Pastor Mike Kim",
    "title" : "Pastoral intern",
    "email" : "pastormike@gracecovenant.net",
    "description" : "Pastor Mike was born in a small town in Korea and moved to San Jose, California at the age of 3 where he spent most of his life.  " +
    "He attended San Jose State University and received a Bachelor of Science in Business Administration, concentrated in Marketing.  " +
    "While operating a coffee shop at University of California, Berkeley, he was called to ministry. " +
    "He received his Masters in Divinity at Gordon-Conwell Theological Seminary and served at Symphony Church in Boston for two years before joining GCC. \n " +
    "Mike loves to eat good food, take long drives through scenic roads, travel and explore unexplored places, play various sports, hike, work on cars, read, and sing. " +
    "He has a heart to see every knee bow and every tongue confess that Jesus is Lord, and to raise up disciples who love Jesus and will be the bearers of His good news. ",
    "pic" : "pmike.jpg"
  },
  {
    "name" : "Chris Chen",
    "title" : "Seminary Intern",
    "email" : "chris@gracecovenant.net",
    "description" : "Chris was born in Queens, New York and grew up in the suburbs of Los Angeles.  " +
    "At 19 he enlisted in the US Army where he was a paratrooper for the special operations community.  " +
    "After 4 years of active duty service and 3 tours to Iraq he left to join a private defense company. " +
    "He worked in Virginia for the next 2 years and deployed to Afghanistan once. " +
    "Chris joined GCC in 2012 while he was studying at the University of Pennsylvania where he graduated with a Bachelor of Arts in Religious Studies. " +
    "In the fall of 2015 Chris will pursue his Masters in Divinity at Westminster Theological Seminary. " +
    "Chris loves to try new things, see new sights and at the end of the day he likes to eat something sweet and drink tea. " +
    "He has a heart to see people come to Christ and to develop deep intimacy with the Father. " +
    "Following Christ has been the best and most exciting ride in Chris’ life!",
    "pic" : "pchris.jpg"
  },
  {
    "name" : "Josh Kwon",
    "title" : "Seminary Intern",
    "email" : "josh.kwon@gmail.net",
    "description" : "Josh spent most of his early life in Southern California in the suburbs of Orange County.  " +
    "He graduated from UCLA with a major in Political Science. For almost a decade after graduating college, Josh worked in the greater Los Angeles area as a real estate advisor.  " +
    "Before coming to Grace Covenant Church (GCC), Josh served at Radiance Christian Church (a fellow AMI church) in San Francisco as a deacon. " +
    "Through the messages and relationships developed at RCC, God’s mandate in making disciples became clear, vivid, and personal. " +
    "Responding to the call to ministry, Josh moved to Philadelphia in 2015, and is currently pursuing his Master of Divinity at Westminster Theological Seminary with an emphasis on pastoral ministry. ",
    "pic" : "pjosh.jpg"
  },
]
router.route('/')
.get(function (request, response) {
  console.log("request for staff");
  response.json(data);
});

module.exports = router;
