const router = require('express').Router()
const isAdmin = require('../middleware/is-admin.js');
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Sign Up
// GET:
router.get('/sign-up', 
    (req, res) => {
        try{
            res.render('auth/sign-up.ejs')
        }
        catch(err){
            console.log(err)
        }
    }
)

// POST:
router.post('/sign-up',
    async (req, res) => {
        try{
            // check if username is used 
            const userIsInDb = await User.findOne({ username: req.body.username })
            if(userIsInDb) {
                return res.send("Username already taken.");
            }

            // chek password fields match
            if (req.body.password !== req.body.confirmPassword) {
                return res.send("Password and Confirm Password must match");
            }

            // hash the pass
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const username = req.body.username

            // Create User
            await User.create({
                username,
                password: hashedPassword
            })

            const getUser = await User.findOne({ username })

            // login the user directly after login 
            // set user Session
            req.session.user = {
                username,
                _id: getUser._id,
                isAdmin: getUser.isAdmin
            };

            // redirect to home page 
            res.redirect('/home')
        }
        catch(err){
            console.log(err)
        }
    }
)

// Login
// GET: 
router.get('/login', 
    (req, res) => {
        try{
            res.render('auth/login.ejs')
        }
        catch(err){
            console.log(err)
        }
    }
)

// POST:
router.post('/login',
    async (req, res) => {
        try{
            // get user from db
            const userIsInDb = await User.findOne({ username: req.body.username })
            if(!userIsInDb) {
                return res.send("Login failed. Please try again");
            }

            // validate password
            const isValid = bcrypt.compareSync(
                req.body.password,
                userIsInDb.password
            )
            if (!isValid) {
                return res.send("Login failed. Please try again.");
            }

            // set user Session
            req.session.user = {
                username: userIsInDb.username,
                _id: userIsInDb._id,
                isAdmin: userIsInDb.isAdmin
            }

            if (user.isAdmin){
                res.redirect('/analysis')
            }
            else{
                res.redirect('/tickets')
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
)

// Logout
// GET:
router.get('/sign-out', 
    (req, res) => {
        try{
            req.session.destroy()
            res.redirect('/home')
        }
        catch(err){
            console.log(err)
        }
    }
)

module.exports = router;