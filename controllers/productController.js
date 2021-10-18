const Product = require("../models/product")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary').v2

// create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const productImages = req.files.productImage
    console.log(productImages);
    let images = []
    if (productImages.constructor === Object) {
        images.push(productImages)
    } else if (productImages.constructor === Array) {
        images = productImages
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
            folder: 'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products
// exports.getProducts = catchAsyncErrors(async (req, res, next) => {
//     const product = await Product.find()
//     res.status(200).json({
//         success: true,
//         count: product.length,
//         product
//     })
// })

// Get all products (filter, search, pagination) => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    // const resPerPage = 4
    // const productsCount = await Product.countDocuments()

    // const apiFeatures = new APIFeatures(Product.find(), req.query)
    //     .searchByQuery()

    // let products = await apiFeatures.query
    // let filteredProductsCount = products.length

    // apiFeatures.pagination(resPerPage)
    // products = await apiFeatures.query

    // res.status(200).json({
    //     success: true,
    //     productsCount,
    //     resPerPage,
    //     filteredProductsCount,
    //     products
    // })

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .searchByQuery()
        .pagination()

    const products = await apiFeatures.query
    res.status(200).json({
        success: true,
        results: products.length,
        data: products
    })
})

// Get single product details => /api/v1/product/:id
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    const productImages = req.files.productImage
    console.log(productImages);
    let images = []
    if (productImages.constructor === Object) {
        images.push(productImages)
    } else if (productImages.constructor === Array) {
        images = productImages
    }

    if (images !== undefined) {
        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
                folder: 'products'
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(product.images[i].public_id)
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: "Product is deleted."
    })
})

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(r =>
        r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/review?productId=<product_id>&reviewId=<review_id>
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId)

    console.log(product)

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString())

    const numOfReviews = reviews.length

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})