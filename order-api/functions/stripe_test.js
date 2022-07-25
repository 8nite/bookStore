import { assert } from 'chai'
import 'dotenv/config'
import { createCustomer, itemToStripePrice, createCheckoutSession, getStripeSession } from './stripe.js';

describe('stripe functions', function () {
    let customeStripe
    it('should be able to create customer in stripe', async function () {
        this.timeout(10000)
        const ret = await createCustomer('anonymous', null)
        assert.exists(ret);
        customeStripe = ret
    })

    let priceStripe
    it('should be able to turn item to stripe price', async function () {
        this.timeout(10000)
        const ret = await itemToStripePrice({ title: 'book title', price: 12.9 })
        assert.exists(ret);
        priceStripe = ret
    })

    let session
    it('should be able to create checkout session', async function () {
        this.timeout(10000)
        const ret = await createCheckoutSession(customeStripe.id, priceStripe.id)
        assert.exists(ret)
        session = ret
    })

    it('should be able to retrieve checkout session', async function () {
        this.timeout(10000)
        const ret = await getStripeSession(session.id)
        assert.exists(ret)
    })

})