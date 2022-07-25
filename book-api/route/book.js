import express from 'express'
const router = express.Router();
import 'dotenv/config'
import { bookListAll, bookInfo } from '../functions/book.js';
import ExpressCache from 'express-cache-middleware'
import cacheManager from 'cache-manager'


router.post('/bookInfo', async (req, res) => {
    res.set('Cache-Control', 'no-store')
    console.log('retriving book info (', req.body, ')')
    const book = await bookInfo(req.db, req.body.title)
    res.json(book)
    console.log('returning book info:', book)
})

const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 1000000, ttl: 60000
    })
)
cacheMiddleware.attach(router)

router.get('/list', async (req, res) => {
    try {
        console.log('listing books (', req.query.countPerPage, req.query.page, ')')
        const countPerPage = parseInt(req.query.countPerPage)
        const page = parseInt(req.query.page)
        const retBooks = await bookListAll(req.db, countPerPage, page)
        res.json(retBooks)
        console.log('returning number of books:', retBooks.length)
    } catch {
        res.send()
    }
})

export default router