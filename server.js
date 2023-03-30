const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMddleware')
const dbConnect = require('./config/dbConnection')

const goalRouter = require('./routes/goalsRoute');
const userRouter = require('./routes/usersRoute');

const PORT = process.env.PORT || 5000

const app = express()

dbConnect()

app.use(express.json())

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Application running at port ${PORT}`.blue)
})