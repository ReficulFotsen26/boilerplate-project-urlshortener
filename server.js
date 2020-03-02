'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var shortUrl = require('shortUrl');
//var dns = require('dns');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.DB_URI || "monogodb://localhost/shortUrls");

app.use(cors());

/** this project needs to parse POST bodies **/
var bodyParser = require("body-parser");
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.post("/api/shorturl/new", function (req, res) {
  var { urlToShorten } = req.params;
  var urlRegex = /[-a-zA-Z)0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\.~#?&//=]*)/gi;
  
  if(urlRegex.test(urlToShorten) === true) {
    return res.json({urlToShorten});
  } 
  return res.json({urlToShorten: "failed"});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});