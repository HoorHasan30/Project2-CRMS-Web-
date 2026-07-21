const router = require('express').Router()

const isAdmin = require('../middleware/is-admin')
const Category = require('../models/Category')
const Technicain = require('../models/Technician')
const Ticket = require('../models/Ticket')

router.get('/', isAdmin,
    async (req, res) => {

        // total numbers
        const tickets = await Ticket.find()
        const  totalTickets = await tickets.length

        const categories = await Category.find()
        const  totalCategories = await categories.length

        const techs = await Technicain.find()
        const  totalTechs = await techs.length


        // Charts Data
        const statusLabels = ['Pending', 'Assigned', 'Completed', 'Rejected']
        const statusCounts = [
            tickets.filter(t => t.status === 'Pending').length,
            tickets.filter(t => t.status === 'Assigned').length,
            tickets.filter(t => t.status === 'Completed').length,
            tickets.filter(t => t.status === 'Rejected').length,
        ]

        const categoriesOnly = await Category.find({isSubCategory: false})
        const categoryLabels = categoriesOnly.map(c => c.name)
        const categoryCounts = categoriesOnly.map(cat =>
            tickets.filter(ticket =>
                ticket.category?.toString() === cat._id.toString()
            ).length
        )

        res.render('analysis/analysis.ejs', {totalTickets, totalCategories, totalTechs, 
                                            statusLabels, statusCounts,
                                            categoryLabels, categoryCounts
                                            })
    }
)

module.exports = router;