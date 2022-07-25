import express from 'express'
import book from './book.js'

const router = express.Router();

router.use('/book', book)

export default router
