const express = require('express');
const path = require('path')
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


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
//     })
// } else {
//     app.get('/', (req,res) => {
//         res.send("Please set to production")
//     })
// }

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Application running at port ${PORT}`.blue)
})