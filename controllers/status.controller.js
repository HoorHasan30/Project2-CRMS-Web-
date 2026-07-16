const router = require('express').Router()

// Not Authorized 
// GET:
router.get('/not-authorized',
    (req, res) => {
        try{
            res.render('status/notAuthorized.ejs')
        }
        catch(err){
            console.log(err)
        }  
    }
)

module.exports = router;