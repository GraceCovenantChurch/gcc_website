var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var memoryVerse = require('./routes/memoryVerse.js');
var staff = require('./routes/staff.js');
var believe = require('./routes/believe.js');
var app = express();

app.use(express.static('client'));
app.use('/mainAnnouncement', mainAnnouncement);
app.use('/smallAnnouncement', smallAnnouncement);
app.use('/memoryVerse', memoryVerse);
app.use('/staff', staff);
app.use('/believe', believe);

app.listen(8000, function() {
  console.log("Listening on port 8000");
});
