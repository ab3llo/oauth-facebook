const Router = require('express').Router(),
    User = require('../model/user.model');

    Router.post('/signup',(req,res)=> {
        let newuser = new User;
        newuser.username = req.body.username;
        newuser.password = req.body.password;
        newuser.save((err,newuser) => {
            if(newuser) {
                req.session.localUser = newuser;
                res.redirect('/homepage');
            }
        })
    })

    Router.post('/login', (req,res)=>{
        User.find({
            username: req.body.username,
            password: req.body.password
        },(err,theuser)=>{
            if(theuser){
                req.session.localUser = theuser;
                res.redirect('/homepage');
            }
        })
    })

module.exports = Router;