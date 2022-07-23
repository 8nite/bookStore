import express from 'express'
import book from './userJourney.js'
import order from './order.js'

const router = express.Router();

router.use('/book', book)
router.use('/order', order)

export default router
