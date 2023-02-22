require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router/index')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()