import express from 'express'
const router = express.Router();
import { } from '../functions/order.js'
import { createCustomer, itemToStripePrice, createCheckoutSession } from '../functions/stripe.js'
import 'dotenv/config'

router.post('/createPaymentSession', async (req, res) => {
    const customer = await createCustomer(req.body.customerName || 'anonymous', req.body.customerPhone) //for future user info
    console.log('Creating customer', customer.id)
    console.log('Purchasing: ', req.body.title, req.body.price)
    const priceInStripe = await itemToStripePrice({
        title: req.body.title,
        price: req.body.price
    })
    console.log('Pricing created for :', customer.id, priceInStripe.id)
    const paymentSession = await createCheckoutSession(customer.id, priceInStripe.id)
    console.log('paymentSession created for :', customer.id, priceInStripe.id)

    res.json({ paymentUrl: paymentSession.url })
})

export default router