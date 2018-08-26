const Router = require('express').Router();
const passport = require('passport');

Router.get('/', passport.authenticate('facebook',{
    scope: ['public_profile']
}));

Router.get('/redirect', passport.authenticate('facebook'),(req,res)=>{
    res.send('logged in');
})

module.exports = Router;