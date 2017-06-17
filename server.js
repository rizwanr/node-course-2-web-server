const express = require('express');

const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');



app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log+ '\n', (err) =>{
  if (err){
    console.log('Unable to append to server.log')
  }
});
next();
});

// app.use((req, res, next)=>{
//   res.render('maintainance.hbs')
//   });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
return text.toUpperCase()
});

app.get('/', (req,res)=>{
res.render('home.hbs',{
  pageTitle : 'Home page',
  welcomeMessage : 'Fuck this shit'
});
});

app.get('/about', (req, res)=>{
res.render('about.hbs',{
pageTitle : 'About page',
});
});

app.get('/bad', (req, res)=>{
res.send({
  errorMessage : 'Unable to fulfill this requests',
  })
});

app.listen(3000);
