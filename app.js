const express = require('express');
const passport = require('passport');
const facebookRoutes = require('./controller/facebook.routes');

let app = express();
app.use('/auth/facebook', facebookRoutes);

app.listen(3000, ()=>{
    console.log('listening on port http://localhost:3000')
})