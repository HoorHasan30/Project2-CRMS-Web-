const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        required: true
    },
    prioraty: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    room: {
        type: String
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician"
    }
}, {timestamps: true})

const Ticket = new mongoose.model("Ticket", ticketSchema)

module.exports = Ticket