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
app.use(express.static('public'));

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
//   console.log('request=', req)
//   giphy.search(req.query.term, function (err, response) {
//     //console.log('response=', res)
//     res.render('home', {gifs: response.data})
//   });
// });
  //console.log('request=', req)
  if (req.query.term != undefined &&  req.query.term != "") {
    giphy.search(req.query.term, function (err, response) {
        console.log('response=', res)
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