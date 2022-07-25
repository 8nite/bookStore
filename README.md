Do not expose order-api and book-api for public access, should only be called by user-api

Note
    - This project is not production ready
    - usually .env is included in gitignore but for non production purposes will keep it here for convenience 
    - there are no schema checking for mongo, alternatively I have used test cases for schema ensure. (faster development when new attributes need to be added)
    - usually will have each micro-services in each single repo

Nice to have features...
    - add signature from FE to BE calls, prevents other parties calling
    - user journey (ie: login, preferences, liked books...)
    - more loggings (for product support)
    - keep transactions in our own DB
    - cornjob for payment status checking
    - swagger page (for openAPI)
    - etc.

=============================ARCHITECTURE===========================================
FE -> user-api  -> ordert-api   -> DB (transactions)
                                -> stripe payment system
                -> book-api     -> DB (books)


=============================QUICK START===========================================
PREREQUISITE
    - node v16.15.1

/book-api
    - yarn install
    - yarn start

/order-api
    - yarn install
    - yarn start

/user-api
    - yarn install
    - yarn start

/FE
    - yarn install
    - yarn start

after, go to http://localhost:3000 in browser

NOTE: for production please build and use serve to start
