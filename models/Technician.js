const mongoose = require('mongoose')

const technicianSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Technician = new mongoose.model("Technician", technicianSchema)

module.exports = Technician