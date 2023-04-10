const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const eventRouter = require('./routes/event')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//router
app.use('/v1', eventRouter)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}`);
        })
    }).catch((error) => {
        console.log(error)
    })
