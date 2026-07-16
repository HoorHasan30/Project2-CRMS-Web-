const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isSubCategory: {
        type: Boolean,
        default: false
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Category = new mongoose.model("Category", categorySchema)

module.exports = Category