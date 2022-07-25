//for add-on features
export const updatePreOrderStatus = ((db, requestId) => {
    return new Promise(async (resolve, reject) => {
        await db.db(process.env.DATABASE).collection('order').updateOne(
            { requestId },
            {
                $set: { status: 'checkout' }
            }, { upsert: true })
        resolve()
    })
})

//for add-on features
export const updateSubmitOrderStatus = ((db, requestId) => {
    return new Promise(async (resolve, reject) => {
        await db.db(process.env.DATABASE).collection('order').updateOne(
            { requestId },
            {
                $set: { status: 'inProgress' }
            }, { upsert: true })
        resolve()
    })
})

//for add-on features
export const updatePostOrderStatus = ((db, requestId) => {
    return new Promise(async (resolve, reject) => {
        await db.db(process.env.DATABASE).collection('order').updateOne(
            { requestId },
            {
                $set: { status: 'completed' }
            }, { upsert: true })
        resolve()
    })
})

//for add-on features
export const isStripePaymentComplete = ((sessionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const session = await getStripeSession(sessionId);
            if (session && session.status === 'complete')
                resolve(true)
            
            resolve(false)
        } catch (e) {
            reject(e)
        }
    })
})