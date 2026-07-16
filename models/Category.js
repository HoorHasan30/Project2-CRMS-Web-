const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategories: {
        type: [String]
    }
}, {timestamps: true})

const Category = new mongoose.model("Category", categorySchema)

module.exports = Category