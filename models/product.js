const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name."],
        trim: true,
        maxLength: [100, "Product name can not exceed 100 characters."] 
    },
    price: {
        type: Number,
        required: [true, "Please enter product price."],
        maxLength: [100, "Product name can not exceed 100 characters."],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description."]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: [true, "Please select category for this product."]
            },
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message: "Please select correct category for product."
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller."]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock."],
        maxLength: [5, "Stocks can not exceed 5 characters."],
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("product", productSchema);