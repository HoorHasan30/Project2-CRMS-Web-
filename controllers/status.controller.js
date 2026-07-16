const router = require('express').Router()

// Not Authorized 
// GET:
router.get('/not-authorized',
    (req, res) => {
        res.render('status/notAuthorized.ejs')
    }
)

module.exports = router;