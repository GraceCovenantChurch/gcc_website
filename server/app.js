
var express = require('express');
var path = require('path');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var memoryVerse = require('./routes/memoryVerse.js');
var staff = require('./routes/staff.js');
var belief = require('./routes/believe.js');
var ministry = require('./routes/ministry.js');
var app = express();

app.use('/admin', require('./admin'));
app.use('/', require('./routes'));
app.use('/staff', staff);
app.use('/belief', belief);
app.use('/ministry', ministry);

app.use(express.static('dist'));

//angular2 needs all routes to redirect to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
})

var db = require('./db.js');
db.initialized.then(function() {
  app.listen(8000, function() {
    console.log("Listening on port 8000");
  });
});
