const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const Stripe = require('stripe')
const stripe = Stripe('sk_test_51Jf83KSIJ7pTLRQApO7SEI7pIAMJ7S4FoHklWPtwRwjJJy3uFi16V261yS1vwzTsVkoSXN7dbtWya1Ez9ZisWqmj003COiUq8r')

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { 
            integration_check: 'accept_a_payment' 
        }
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})