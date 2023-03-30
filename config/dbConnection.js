const mongoose = require("mongoose")
const colors = require("colors")




const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to Database".cyan.underline)
    }catch(error) {
        console.log(error)
    }

}

module.exports = dbConnect