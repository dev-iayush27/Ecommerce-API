const Product = require("../models/product");
const connectDatabase = require('../database');
const dotenv = require('dotenv');
const products = require('../data/products');

// Setting dotenv file
dotenv.config({ path: 'config.env' })

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.stack);
        process.exit();
    }
}

seedProducts();