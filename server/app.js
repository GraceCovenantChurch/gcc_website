var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var app = express();

app.use(express.static('client'));
app.use('/mainAnnouncement', mainAnnouncement);

app.listen(8000, function() {
  console.log("Listening on port 8000");
});
