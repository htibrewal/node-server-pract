const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`

  // console.log(`${now} : ${req.method} ${req.url}`);    //printing the time along with the request method and url requested for
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
      console.log('Unable to append log');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintain.hbs');
});

app.use(express.static(__dirname + '/public'));                                      //it takes middleware which we want to use
//express.static takes absolute path to the folder you want to serve up

hbs.registerHelper('getCurrentYear', () => {       //anything we return is gone get rendered in place of getCurrentYear call
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {                //req stores info about request coming in, body info, res for response
  // res.send('<h1>Hello express!</h1>');
  /*res.send({                               //express notices the obj and converts it into JSON
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  });*/

  res.render('home.hbs', {
    welcomeMesssge: 'Welcome to Our Home Page',
    pageTitle: 'Home Page'
  })
});                                               //let us set an handler for HTTP get request

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs',{                                 //this data is dynamically inserted into our page
    pageTitle: 'About Page'
  });                          //lets us render any template set up with our current view engine
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.listen(3000);                                //going to bind the app to a port on our machine
