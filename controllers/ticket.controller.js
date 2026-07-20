const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin.js')

const Ticket = require('../models/Ticket')

const Category = require('../models/Category.js')
const Technicain = require('../models/Technician.js')

const { isValidObjectId } = require('mongoose')

// ALL
// GET: All Tickets (Only Admin)
router.get('/', isAdmin, 
    async (req, res) => {
        try{
            const allTickets = await Ticket.find().populate('category').populate('subCategory').populate('owner')
            res.render('tickets/index.ejs', {allTickets})
        }
        catch(err){
            console.log(err)
        }
    }
)
// GET: My Tickets (User)
router.get('/myTickets', isSignedIn, //User
    async (req, res) => {
        try{
            const allTickets = await Ticket.find({
                owner: req.session.user._id
            }).populate('category').populate('subCategory').populate('owner')
            res.render('tickets/index.ejs', {allTickets})
        }
        catch(err){
            console.log(err)
        }
    }
)


// CREATE
// GET:
router.get('/new', isSignedIn,
    async (req, res) => {
        try{
            const categories = await Category.find({isActive: true})
            res.render('tickets/new.ejs', {categories})
        }
        catch(err){
            console.log(err)
        }
    }
)

// POST:
router.post('/', isSignedIn,
    async (req, res) => {
        try{
            await Ticket.create({
                owner: req.session.user._id,
                status: "Pending",
                category: req.body.category,
                subCategory: req.body.subCategory,
                description: req.body.description,
                building: req.body.building,
                room: req.body.room
            })
            res.redirect('/tickets/myTickets')
        }
        catch(err){
            console.log(err)
        }
    }
)


// READ ONE
// GET:
router.get('/:id', isSignedIn,
    async (req, res) => {
        try{
            const ticket = await Ticket.findById(req.params.id).populate('category').populate('subCategory').populate('owner').populate('technician')
            res.render('tickets/show.ejs', {ticket})
        }
        catch(err){
            console.log(err)
        }
    }
)

// UPDATE Before Assign
// GET:
router.get('/:id/edit', isSignedIn, 
    async (req, res) => {
        try{
            const ticket = await Ticket.findById(req.params.id).populate('category').populate('subCategory').populate('owner')
            res.render('tickets/edit.ejs', {ticket})
        }
        catch(err){
            console.log(err)
        }
    }
)

// PUT:
router.put('/:id', isSignedIn,
    async (req, res) => {
        try{
            await Ticket.findByIdAndUpdate(req.params.id, {
                owner: req.session.user._id,
                status: "Pending",
                category: req.body.category,
                subCategory: req.body.subCategory,
                description: req.body.description,
                building: req.body.building,
                room: req.body.room
            })
            res.redirect('/tickets/myTickets')
        }
        catch(err){
            console.log(err)
        }
    }
)


// Assign (prioraty, tech)
router.get('/:id/assign', isAdmin, 
    async (req, res) => {
        try{
            const technicains = await Technicain.find({isActive: true})
            const ticket = await Ticket.findById(req.params.id).populate('category').populate('subCategory').populate('owner')
            res.render('tickets/assign.ejs', {ticket, technicains})
        }
        catch(err){
            console.log(err)
        }
    }
)

// PUT:
router.put('/:id/assign', isAdmin,
    async (req, res) => {
        try{
            await Ticket.findByIdAndUpdate(req.params.id, {
                status: "Assigned",
                prioraty: req.body.prioraty,
                technician: req.body.technician
            })
            res.redirect('/tickets')
        }
        catch(err){
            console.log(err)
        }
    }
)

router.put('/:id/completed', isAdmin,
    async (req, res) => {
        try{
            await Ticket.findByIdAndUpdate(req.params.id, {
                status: "Completed"
            })
            res.redirect('/tickets')
        }
        catch(err){
            console.log(err)
        }
    }
)

// DELETE
// DELETE:
router.delete('/:id/delete', isSignedIn,
    async (req, res) => {
        try{
            await Ticket.findByIdAndDelete(req.params.id)
            res.redirect('/tickets/myTickets')
        }
        catch(err){
            console.log(err)
        }
    }
)


module.exports = router;