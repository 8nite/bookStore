import axios from "axios"

export const bookList = ((countPerPage, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const price = await axios({
                method: 'GET',
                url: process.env.DOMAIN + ':' + process.env.BOOK_API_PORT + '/book/list?countPerPage=' + countPerPage + '&page=' + page
            })

            resolve(price.data)
        } catch (e) {
            console.error(e)
            //reject(e)
        }
    })
})

export const bookInfo = ((title) => {
    return new Promise(async (resolve, reject) => {
        try {
            const price = await axios({
                method: 'POST',
                url: process.env.DOMAIN + ':' + process.env.BOOK_API_PORT + '/book/bookInfo',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    title
                }
            })

            resolve(price.data)
        } catch (e) {
            console.error(e)
            //reject(e)
        }
    })
})

export const checkoutValidationAndGetPrice = ((title) => {
    return new Promise(async (resolve, reject) => {
        try {
            //need to add more validation for checkout alter on
            if (typeof title === 'string')
                resolve((await bookInfo(title)).price)
            resolve(false)
        } catch (e) {
            console.error(e)
            //reject(e)
        }
    })
})

export const createCheckout = ((title, price, customerName, customerPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkout = await axios({
                method: 'POST',
                url: process.env.DOMAIN + ':' + process.env.ORDER_API_PORT + '/order/createPaymentSession',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { title, price, customerName, customerPhone }
            })

            resolve(checkout.data.paymentUrl)
        } catch (e) {
            console.error(e)
            //reject(e)
        }
    })
})