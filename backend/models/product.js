const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number,
    comment: String
});
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: true
    },

    images: {
        type: [String],
        default: []
    },
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);