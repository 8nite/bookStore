import { assert } from 'chai'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { bookListAll, bookInfo } from './book.js';

describe('Mongo functions', function () {
    it('should be able to connect DB', async function () {
        this.timeout(1000)
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect();
        assert.exists(client);
    })
})

describe('bookList functions', function () {
    let allBooks, booksInStock

    it('should be able to list all books', async function () {
        this.timeout(1000)
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const ret = await bookListAll(client, 20, 0)
        console.log(ret)
        assert.exists(ret)
        assert.equal(ret.length <= 20, true)
        allBooks = ret
    })
    
    it('should be able to find the book', async function () {
        this.timeout(1000)
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const retTrue = await bookInfo(client, 'Fundamentals of Wavelets')
        assert.equal(retTrue.price > 0, true)
    })

    it('should bot be able to find the book', async function () {
        this.timeout(1000)
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const retFalse = await bookInfo(client, 'Fundamentals')
        assert.equal(retFalse, null)
    })
})