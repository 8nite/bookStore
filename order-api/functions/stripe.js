import Stripe from 'stripe'

export const createCustomer = ((name, phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_API_SECRET)
            const customer = await stripe.customers.create({
                name, phone
            })

            resolve(customer)
        } catch (e) {
            reject(e)
        }
    })
})

export const itemToStripePrice = ((item) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalPrice = Math.round(item.price * 100)  //in cent
            //products info are not kept in stripe
            //backet can have max 1 item for now
            const stripe = new Stripe(process.env.STRIPE_API_SECRET)
            const priceInStripe = await stripe.prices.create({
                unit_amount: totalPrice,
                currency: 'usd',
                product_data: {
                    name: item.title
                }
            })

            resolve(priceInStripe)
        } catch (e) {
            reject(e)
        }
    })
})

export const createCheckoutSession = ((customerId, priceInStripe) => {
    return new Promise(async (resolve, reject) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_API_SECRET)
            const session = await stripe.checkout.sessions.create({
                success_url: process.env.DOMAIN + ':' + process.env.FE_PORT + '/payment/success',
                cancel_url: process.env.DOMAIN + ':' + process.env.FE_PORT + '/payment/cancel',
                customer: customerId,
                line_items: [{
                    price: priceInStripe,
                    quantity: 1
                }],
                mode: 'payment',
            });

            resolve(session)
        } catch (e) {
            reject(e)
        }
    })
})

export const getStripeSession = ((sessionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_API_SECRET)
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            resolve(session)
        } catch (e) {
            reject(e)
        }
    })
})