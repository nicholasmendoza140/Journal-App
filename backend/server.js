require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const entryRoutes = require('./routes/entries')

const app = express()

app.use(express.json())

//routes
app.use('/entries', entryRoutes)

app.get('/', (req, res) => {
    res.json({msg: "Hello"})
})

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(4000, () => {
            console.log('Connect to DB and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

