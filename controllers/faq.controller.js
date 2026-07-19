const router = require('express').Router()
const isAdmin = require('../middleware/is-admin.js')

const FAQ = require('../models/FAQ.js')

// ALL
// GET: 
router.get('/',
    async (req, res) => {
        try{
            const allFaq = await FAQ.find()
            res.render('faq/index.ejs', {allFaq, user: req.session.user})
        }
        catch(err){
            console.log(err)
        }
    }
)

// Create
// GET: 
// router.get('/new', isAdmin,
//     (req, res) => {
//         try{
//             res.render('faq/new.ejs')
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
// )

// POST:
router.post('/', isAdmin,
    async (req, res) => {
        try{
            await FAQ.create({
                question: req.body.question,
                answer: req.body.answer
            })

            res.redirect('/faq')
        }
        catch(err){
            console.log(err)
        }
    }
)

// Read
// GET: 
// router.get('/edit/:id',
//     async (req, res) => {
//         try{
//             res.render('faq/show.ejs')
//         }
//         catch(err){
//             console.log(err)
//         } 
//     }
// )

// Update
// GET: 
router.get('/:id/edit', isAdmin,
    async (req, res) => {
        try{
            const faq = await FAQ.findById(req.params.id)
            res.render('faq/edit.ejs', {faq})
        }
        catch(err){
            console.log(err)
        } 
    }
)

// PUT:
router.put('/:id', isAdmin,
    async (req, res) => {
        try{
            await FAQ.findByIdAndUpdate(req.params.id, {
                question: req.body.question,
                answer: req.body.answer
            })

            res.redirect('/faq')
        }
        catch(err){
            console.log(err)
        } 
    }
)


// Delete
// DELETE:
router.delete('/:id/delete', isAdmin,
    async (req, res) => {
        try{
            await FAQ.findByIdAndDelete(req.params.id)
            res.redirect('/faq')
        }
        catch(err){
            console.log(err)
        } 
    }
)

module.exports = router;