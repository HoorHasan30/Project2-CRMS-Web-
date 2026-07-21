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
        const statusLabels = ['Pending', 'Assigned', 'Completed']
        const statusCounts = [
            tickets.filter(t => t.status === 'Pending').length,
            tickets.filter(t => t.status === 'Assigned').length,
            tickets.filter(t => t.status === 'Completed').length
        ]


        const prioratyLabels = ['High', 'Moderate', 'Low']
        const prioratyCounts = [
            tickets.filter(t => t.prioraty === 'High').length,
            tickets.filter(t => t.prioraty === 'Moderate').length,
            tickets.filter(t => t.prioraty === 'Low').length
        ]

        res.render('analysis/analysis.ejs', {totalTickets, totalCategories, totalTechs, 
                                            statusLabels, statusCounts,
                                            prioratyLabels, prioratyCounts
                                            })
    }
)

module.exports = router;