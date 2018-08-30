/////////////////////////////////////////
//  This is the required variable to use express
/////////////////////////////////////////

//This sets up the express framework enviroment
var express = require('express');
//It's so weird about Javascript that you can have a function in a variable
var app = express();
//This sets up handlebars
var exphbs  = require('express-handlebars');

var http = require('http');

var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/////////////////////////////////////////
//  THIS ARE ROUTES
/////////////////////////////////////////

//Route to get hello
app.get('/hello-hello', function (req, res) {
  res.send('Hey');
});
//Route that says hello
app.get('/hello-world', function (req, res) {
  res.send('Hello World');
});
//Route to show gif
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {gifUrl: gifUrl});
});
//Route to get names
app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
});
//Route root 
app.get('/', function (req, res) {
  console.log(req.query.term);
  var queryString = req.query.term;
  //Encode the query space to remove white spaces and restricted characters
  var term = encodeURIComponent(queryString);
  //Put the search term on the giphy API SEARCH URL
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

  http.get(url, function(response) {
    //Set encoding of response to UTF8
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d){
      //Continously update with data from GIPHY
      body += d;
    });

    response.on('end', function() {
      //When data is fully received parse into JSON
      var parsed = JSON.parse(body);
      //Render home template and pass the gif data in to the template
      res.render('home', {gifs: parsed.data});
    });

  });

  res.render('home');
});

/////////////////////////////////////////
//  This connects with the server
/////////////////////////////////////////

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});