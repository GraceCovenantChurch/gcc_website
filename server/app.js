var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var app = express();

app.use(express.static('client'));
app.use('/mainAnnouncement', mainAnnouncement);
app.use('/smallAnnouncement', smallAnnouncement);
app.listen(8000, function() {
  console.log("Listening on port 8000");
});
