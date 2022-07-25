import { assert } from 'chai'
import 'dotenv/config'
import { updatePreOrderStatus } from './order.js';
import { MongoClient } from 'mongodb'

describe('order functions', function () {
    it('should be able to update preorder status', async function () {
        this.timeout(10000)
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect();
        const ret = await updatePreOrderStatus(client, 'cusId', 'priceId')
        assert.exists(ret);
        
        const reqInDb = await client.db(process.env.DATABASE).collection('order').findOne({requestId: ret})
        assert.exists(reqInDb);
    })
})