const router = require('express').Router()
const isAdmin = require('../middleware/is-admin.js')

const Technician = require('../models/Technician.js')

// Routes
// GET:
router.get('/', isAdmin,
    async (req, res) => {
        try{
            const allTech = await Technician.find()
            res.render('technicians/index.ejs', {allTech})
        }
        catch(err){
            console.log(err)
        }
    }
)

// POST:
router.post('/', isAdmin,
    async (req, res) => {
        try{

            await Technician.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contactNumber: req.body.contactNumber
            })

            res.redirect('/technician')
            
        }
        catch(err){
            console.log(err)
        }
    }
)

// UPDATE:
router.put('/:id', isAdmin,
    async (req, res) => {
        try{
            
            req.body.isActive = Boolean(req.body.isActive)

            await Technician.findByIdAndUpdate(req.params.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contactNumber: req.body.contactNumber,
                isActive: req.body.isActive
            })

            res.redirect('/technician')
            
        }
        catch(err){
            console.log(err)
        }
    }
)


module.exports = router;