require('dotenv').config();
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poll', { useNewUrlParser: true ,  useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db


