export const bookListAll = ((db, countPerPage, page) => {
    return new Promise(async (resolve, reject) => {
        const allBooksQuery = await db.db(process.env.DATABASE).collection('books').find({}).limit(countPerPage).skip(page * countPerPage)
        const allBooks = await allBooksQuery.toArray()

        resolve(allBooks)
    })
})

export const bookInfo = ((db, title) => {
    return new Promise(async (resolve, reject) => {
        const book = await db.db(process.env.DATABASE).collection('books').findOne({ title })

        if (book)
            resolve(book)
        resolve(null)
    })
})