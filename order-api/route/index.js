import express from 'express'
import order from './order.js'
import payment from './payment.js'

const router = express.Router();

router.use('/order', order)
router.use('/payment', payment)

export default router
