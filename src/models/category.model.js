const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Category must have a name']
    },
    image: {
        type: String,
        required: [true, 'Category must have an image'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date
    }
});

const CategoriesModel = mongoose.model("Categories", schema);

module.exports = CategoriesModel;
