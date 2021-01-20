const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const db = require('./Server/db')
const pollRouter = require('./Server/routes/poll_router')
const responseRouter = require('./Server/routes/response_router')

const app = express()
const apiPort = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


db.on('error', console.error.bind(console, 'MongoDB connection error:'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client_Side/build'))
}

app.use(morgan('tiny'))

app.use('/api', pollRouter)
app.use('/Rapi', responseRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))