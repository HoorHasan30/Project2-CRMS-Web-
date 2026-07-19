const router = require('express').Router()

// Home Page 
// GET:
router.get('/home', 
    (req, res) => {
       try{
        res.render('index.ejs', {user: req.session.user})
       }
       catch(err){
        console.log(err)
       } 
    }
)


module.exports = router;