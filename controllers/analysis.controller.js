const router = require('express').Router()

router.get('/', 
    (req, res) => {
        res.render('/analysis/analysis.ejs')
    }
)

module.exports = router;