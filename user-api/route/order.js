import express from 'express'
const router = express.Router();
import axios from 'axios'
import 'dotenv/config'

router.get('/bookList', async function (req, res) {
})

router.post('/checkout', async function (req, res) {
    if (await checkoutValidation(req.body.title)) {
        res.json(await createCheckout(req.body.title))
    }
    res.status(400).json({msg: 'check out validation error'})
})

export default router