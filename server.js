const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middlewares/error')
const fileupload = require('express-fileupload')
// Load env vars
dotenv.config({ path: './config/config.env' })

const app = express()

const bootcampsRouter = require('./routes/bootcamps.router')
const coursesRouter = require('./routes/courses.router')

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body parser
app.use(express.json())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// File uploading
app.use(fileupload())

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter)
app.use('/api/v1/courses', coursesRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

// Connect to database then run server
const startServer = () => {
  connectDB()
    .then(() => {
      app.listen(
        PORT,
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
            .bold
        )
      )
    })
    .catch(err => {
      console.log(`Cannot connect to database : ${err}`.red.bold)
      process.exit(1)
    })
}

startServer()
