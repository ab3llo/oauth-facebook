const express = require('express'),
    passport = require('passport'),
    facebookRoutes = require('./controller/facebook.routes'),
    localUserRoutes = require('./controller/local.routes'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    https = require('https'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    key = require('./appKey');
certPath = "cert";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(session({secret: key.secret}));
app.use(passport.initialize());
app.use(passport.session());

require('./controller/facebook.setup');

mongoose.connect('mongodb://localhost/advproject5')


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
})

app.use('/auth/facebook', facebookRoutes);
app.use('/auth/local', localUserRoutes);

app.get('/homepage',(req,res)=>{
    if(req.user){
        res.send(req.user);
    }else if(req.session.localUser){
        res.send(req.session.localUser);
    }else {
        res.redirect('/homepage');
    }
})
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })