const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
            default: [],
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
            default: 'BVR Spices',
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        variants: [
            {
                weight: { type: String, required: true },
                price: { type: Number, required: true },
                countInStock: { type: Number, required: true },
            }
        ],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        weight: {
            type: String,
            required: false
        },
        ingredients: {
            type: String,
            required: false
        },
        usageTips: {
            type: String,
            required: false
        },
        isBestSeller: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
