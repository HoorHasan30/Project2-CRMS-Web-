const router = require('express').Router()

// Home Page 
// GET:
router.get('/home', 
    (req, res) => {
       try{
        res.render('index.ejs')
       }
       catch(err){
        console.log(err)
       } 
    }
)

// About Page
// GET:
router.get('/about', 
    (req, res) => {
        try{
            res.render('about.ejs')
        }
        catch(err){
            console.log(err)
        }
    }
)

module.exports = router;