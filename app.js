/////////////////////////////////////////
//  This is the required variable to use express
/////////////////////////////////////////

var express = require('express');
//It's so weird about Javascript that you can have a function in a variable
var app = express();
//
var exphbs  = require('express-handlebars');

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
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
});
//Route to get names
app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})
//Route root 
app.get('/', function (req, res) {
  res.render('home')
})

/////////////////////////////////////////
//  This helps
/////////////////////////////////////////
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});