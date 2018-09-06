/////////////////////////////////////////
//  Required variable to use express
/////////////////////////////////////////

//This sets up the express framework enviroment
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

/////////////////////////////////////////
//  ROUTES
/////////////////////////////////////////

//GET root 
app.get('/', function (req, res) {
  //console.log('request=', req)
  if (req.query.term != undefined &&  req.query.term != "") {
    giphy.search(req.query.term, function (err, response) {
      //console.log('response=', res)
      res.render('home', {gifs: response.data})
    });
  }
  else {
    giphy.trending(function (err, response) {
      res.render('home', {gifs: response.data})
    });
  }
});

/////////////////////////////////////////
//  This connects with the server
/////////////////////////////////////////

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});