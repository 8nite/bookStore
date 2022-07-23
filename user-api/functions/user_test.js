import { assert } from 'chai'
import 'dotenv/config'
import { bookList, bookInfo, createCheckout } from './user.js';

describe('user functions', function () {
    it('should be able to list books', async function () {
        this.timeout(10000)
        await bookList(20, 0)
        const ret = await bookList(20, 0)
        assert.exists(ret)
    })

    it('should be able to check book in stock', async function () {
        this.timeout(10000)
        const ret = await bookInfo('Fundamentals of Wavelets')
        assert.exists(ret)
    })

    it('should be able to check book not in stock', async function () {
        this.timeout(10000)
        const ret = await bookInfo('Fundamentals')
        assert.equal(ret, null)
    })

    it('should be able to create checkout', async function () {
        this.timeout(10000)
        const ret = await createCheckout('Fundamentals of Wavelets', 1)
        assert.exists(ret)
    })
})