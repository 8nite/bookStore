import express from 'express'
const router = express.Router();
import axios from 'axios'
import 'dotenv/config'
import { bookList, checkoutValidationAndGetPrice, createCheckout } from '../functions/user.js'

router.get('/bookList', async function (req, res) {
    console.log('FE calling bookList(', req.query.countPerPage, req.query.page, ')')
    res.json(await bookList(req.query.countPerPage, req.query.page))
})

router.post('/checkout', async function (req, res) {
    console.log('FE calling checkout(', req.body, ')')
    const price = await checkoutValidationAndGetPrice(req.body.title)
    console.log('checkoutValidationAndGetPrice: ', price)
    if (price) {
        const paymentUrl = await createCheckout(req.body.title, price, req.body.customerName, req.body.customerPhone)
        res.json(paymentUrl)
        console.log('createCheckout', paymentUrl)
        return
    }
    res.status(400).json({ msg: 'check out validation error' })
})

export default router