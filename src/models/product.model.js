const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name']
    },
    images: {
        type: [String],
        required: [true, 'Product must have images']
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    ratingsAverage: {
        type: Number,
        default: 2.5
    },
    description: {
        type: String,
        required: [true, 'Product must have description'],
        trim: true
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, 'Product must have image cover']
    },
    createdAt: {
        type: Date,
    },
    updatedAt: Date,
    sold: Number,
    price: {
        type: Number,
        required: [true, 'Product must have price']
    }
});

const ProductModel = mongoose.model('Products', schema);

module.exports = ProductModel;