var express = require('express');
var router = express.Router();


var data = [
  {
    "name" : "Diakonos",
    "coordinator" : "Emily Schutsky",
    "contact" : "eschutsk@gmail.com",
    "pic" : "diakonos.jpg",
    "privileges" : "Diakonos (Greek for “one who serves”) is GCC’s community service ministry that aims observe one of Jesus’ great commandments: love your neighbor as yourself (Matthew 22:39). We are currently partnering with the Jane Addams Place, a domestic violence shelter in West Philadelphia that houses mothers and children that have fled from abusive homes; our mission here to is to provide one-on-one educational tutoring to both the mothers (GED, college classes) and the children (kindergarten through twelfth grade, including SAT/ACT tutoring).",
    "timeCommitment" : "We will be meeting from 5:15 to 7 PM on Tuesdays. There are also opportunities for family groups to come in and interact with the kids in some creative fashion (like a play day, or leading arts/crafts, etc.)"
  },
  {
    "name": "Evangelism",
    "coordinator": "Joanna Bak",
    "contact" : "joannab373@gmail.com",
    "pic" : "evangelism.jpg",
    "privileges" : "The purpose of the evangelism team is two-fold: to love God and His people (Matt 22:37-40) and to raise up Kingdom workers who are transformed by Christ to influence the world. We aim to display our love for God by obeying His commandments (John 14:15), one of which is the Great Commission (Matt 28:18-20). We also aim to love people by sharing the greatest hope and joy that we know, which is the Gospel displayed through Jesus Christ. Through sharing the Gospel weekly and holding different servant evangelism events in the UC area, we hope that people will come to know Christ personally and that we ourselves will be further transformed by God in order to be used around the world.",
    "timeCommitment" : "On average, we require a 2 hour weekly commitment with variability due to servant evangelism events."
  },
  {
    "name" : "Finance",
    "coordinator" : "Qiao Qi Lu",
    "contact" : "qiaoqilu@gmail.com",
    "pic" : "finance.jpg",
    "privileges" : "To administer all finance related matters for GCC, including collecting and recording offering, providing reimbursements and recording expenses, and providing financial data to the Pastors and the Church.",
    "timeCommitment" : "Will be expected to be available for various responsibilities surrounding an event, as well as take up individualized tasks; will also meet about once every two weeks as a team."
  },
  {
    "name" : "Graphics",
    "coordinator" : "Robyn Chan",
    "contact" : "robynmchan@gmail.com",
    "pic" : "graphics.jpg",
    "privileges" : "The purpose of the graphics ministry team is to convey information to the congregation and also to the broader community through announcement slides and other graphics that make use of the team members’ gifts and talents.",
    "timeCommitment" : "The graphics ministry team usually meets every few weeks in order to pray about the different events that will be coming up for the church. Also, in producing announcements and other visual materials, the team spends time using digital editing software and visual design tools to figure out how to best get information across to the audience (congregation or the larger community). Another important aspect for the graphics ministry team is flexibility in design, as many different ideas are tested to figure out which will have the most impact. Overall, the team seeks to prayerfully produce materials through the use of design software."
  },
  {
    "name" : "Hospitality",
    "coordinator" : "Joanna Xue & Sophia Chao",
    "pic" : "hospitality.jpg",
    "contact" : "alto.mei.mei@gmail.com & sophia.chao19@gmail.com",
    "privileges" : "As a ministry team, hospitality seeks to bless the congregation by providing refreshments for Sunday services and other church events. We pray for our church and serve God’s people ultimately to bring more worship to Him!",
    "timeCommitment" : "We meet before services in order to set up food, prepare for service, and pray. Afterwards, the team stays behind to clean up. Hospitality is also responsible for providing food for special events such as Easter Sunday."
  },
  {
    "name" : "Multimedia",
    "coordinator" : "Dan Leung",
    "pic" : "multimedia.jpg",
    "contact" : "dkleung92@gmail.com",
    "privileges" : "Based on 2 Peter 1:16 that states “For we did not follow cleverly devised myths when we made known to you the power and coming of our Lord Jesus Christ, but we were eyewitnesses of His Majesty,” Multimedia is a team that is dedicated to testify God’s presence in GCC’s fellowship and events through photography and videos.",
    "timeCommitment" : "As eyewitnesses, we meet bi-weekly on Sundays as a group to pray and discuss projects. We meet in smaller groups throughout the semester to work on video projects, such as Intro Night and Praise Night videos. We photograph and record videos throughout events in the church."
  },
  {
    "name" : "Overflow",
    "coordinator" : "Nicky Ly",
    "pic" : "overflow.jpg",
    "contact" : "nly714@gmail.com",
    "privileges" : "Overflow is a dance ministry that seeks to worship God and evangelize through skit and dance. Through our worship, we aim to spread the Gospel while also building up the church body.",
    "timeCommitment" : "We have practices twice a week, where we spend time in prayer and dance rehearsal. We have several performances spread throughout the academic year, ending with our own show in mid-April."
  },
  {
    "name" : "Transportation",
    "coordinator" : "Josh Kwon",
    "pic" : "transportation.jpg",
    "contact" : "joshkwon@gmail.com",
    "privileges" : "We provide transportation for students from different campuses to FNL and Sunday services at GCC. We also provide transportation for special church related functions.  In addition, we keep logs of church van maintenance and implement follow up as necessary.",
    "timeCommitment" : "Driving schedule is rotational, at minimum twice per month and at maximum 4 times per month.  The requirement is the ability to drive a van and 21 years of age. Each team member is expected to attend a general meeting once per semester and one additional fellowship meeting. We will provide training for new members to learn the routes."
  },
  {
    "name" : "Welcoming",
    "coordinator" : "Michele San",
    "pic" : "welcoming.jpg",
    "contact" : "michelesan95@gmail.com",
    "privileges" : "The welcoming ministry exists to show Jesus’ love to the congregation by greeting, ushering, and initiating relationships in fellowship, with an increased focus on newcomers and seekers.",
    "timeCommitment" : "The team prepares the room and atmosphere of GCC events (Sunday worship, Friday Night, special events, etc.) by setting up supplies and handling some logistics. The welcoming ministry is also called upon by other teams to assist in various tasks."
  },
  {
    "name" : "Worship Team",
    "coordinator" : "Chadwick Moyer",
    "pic" : "worship.jpg",
    "contact" : "chadwick.moyer@gmail.com",
    "privileges" : "Our worship ministry exists to worship God, the Father, Jesus, the Son, and the Holy Spirit and to lead the church body in Spirit-led corporate worship through music. Furthermore, this ministry strives to raise up passionate worshipers and worship leaders who worship God in Spirit and in truth.",
    "timeCommitment" : "The worship team is responsible to move and setup equipment in preparation for our weekend services as well as special events and retreats. We also prepare both musically and spiritually to enter into times of worship as well as intercede for the church as a body."
  }
];

router.route('/')
.get(function (request, response) {
  console.log("request for ministries");
  response.json(data);
});

module.exports = router;
