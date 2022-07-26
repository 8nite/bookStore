import express from 'express'
import expressMongoDb from 'express-mongo-db'
import route from './route/index.js'
import bodyparser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/", route);

app.listen(process.env.USER_API_PORT)
console.log('USER API listening on ' + process.env.USER_API_PORT);