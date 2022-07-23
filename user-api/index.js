import express from 'express'
import expressMongoDb from 'express-mongo-db'
import route from './route/index.js'
import bodyparser from 'body-parser'
import 'dotenv/config'
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(expressMongoDb(process.env.MONGO_URI));

app.use("/", route);

app.listen(process.env.USER_API_PORT)
console.log('USER API listening on ' + process.env.USER_API_PORT);