const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')

// Environment vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

const app = express()

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Cors
app.use(cors())

// Bodyparser
app.use(express.json())

// Serve routes
app.use('/api/tasks', require('./routes/api/tasks'))

// Error handler
app.use(errorHandler)

// Listener
const port = process.env.PORT || 5000
app.listen(
  port,
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  )
)
