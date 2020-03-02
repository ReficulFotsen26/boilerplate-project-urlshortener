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
    var short = math.floor(Math.random()*100000).toString();

    var data = new shortUrl(
      {
          originalUrl: urlToShorten,
          shortUrl: short
      }
    );
    data.save(err=>{
      if (err){
        return res.send("Error saving to database");
      }
    });
    return res.json(data);
  } 
  var data = new shortUrl({
    originalUrl: "the url given doesn't match the http format",
    shorterUrl: "InvalidUrl"
  })
  return res.json(data);
});

app.get("/api/shorturl/new", (req, res, next) => {
  var shorterUrl = req.params.urlToForward;

  shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
    if(err)
      return res.send('Error');
      var regex = new RegExp("^(http|https)://", "i");
      var strToCheck = data.originalUrl;
      if(regex.test(strToCheck)){
        res.redirect(301, data.originalUrl);
      } else{
        res.redirect(301,"http//" + originalUrl)
      }
    }
  );
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});