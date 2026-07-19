const router = require("express").Router()

const isAdmin = require('../middleware/is-admin')
const Category = require('../models/Category')

// Categories
// ALL
// GET:
router.get('/', isAdmin,
    async (req, res) => {
        try{
            const allCat = await Category.find({
                isSubCategory: false
            })
            res.render('categories/index.ejs', {allCat})
        }
        catch(err){
            console.log(err)
        }
    }
)

// CREATE
// POST:
router.post('/', isAdmin,
    async (req, res) => {
        try{
            await Category.create({
                name: req.body.name
            })

            res.redirect('/categories')
        }
        catch(err){
            console.log(err)
        }
    }
)

// READ 
// GET:
router.get('/:id', isAdmin, 
    async (req, res) => {
        try{
            const cat = await Category.findOne({_id:req.params.id, isSubCategory: false})
            const allSubCategories = await Category.find({parentCategory: req.params.id})

            console.log(cat)
            res.render('categories/show.ejs', {cat, subCategories:allSubCategories })
        }
        catch(err){
            console.log(err)
        }
    }
)

// GET: Sub-Category
router.get('/sub-categories/:id', isAdmin, 
    async (req, res) => {
        try{
            const allSubCategories = await Category.find({parentCategory: req.params.id, isActive: true})

           res.json({subcategories:allSubCategories})
        }
        catch(err){
            console.log(err)
        }
    }
)

// CREATE: Sub-Category
router.post('/:id', isAdmin,
    async (req, res) => {
        try{
            const category = await Category.findById(req.params.id)

            // take the new category 
            req.body.isSubCategory = true
            req.body.parentCategory = req.params.id
            const newSubCat = await Category.create(req.body)

            res.redirect('/categories/' + req.params.id)
        }
        catch(err){
            console.log(err)
        }
    }
)

// UPDATE
// PUT:
router.put('/:id/edit', isAdmin, 
    async (req, res) => {
        try{
            req.body.isActive = Boolean(req.body.isActive)
            const cat = await Category.findByIdAndUpdate(req.params.id, {isActive: req.body.isActive})
            
            res.redirect('/categories')

        }
        catch(err){
            console.log(err)
        }
    }
)

// UPDATE: Sub-Category
// PUT:
router.put('/:id/editSub', isAdmin, 
    async (req, res) => {
        try{

            req.body.isActive = Boolean(req.body.isActive)
            const subCat = await Category.findByIdAndUpdate(req.params.id, {isActive: req.body.isActive})
            
            res.redirect(`/categories/${subCat.parentCategory}`)

        }
        catch(err){
            console.log(err)
        }
    }
)


module.exports = router;