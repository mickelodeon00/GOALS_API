const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            // res.status(400).json({messages: "Input all fields"})
            res.status(400)
            throw new Error('Input all fields')
        }
        const userExixts = await User.findOne({email})
        if (userExixts) {
            // res.status(400).json({message: "User already exist"})
            res.status(400)
            throw new Error('User already exist')
        }
        
        const salt = await bcrypt.genSaltSync(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashed
        })
        if (user) {
            console.log(user)
            res.status(201).json({
                name,
                email,
                token: generateToken(user._id)
            })
        }
                
    }catch(error){
        console.log(error.message)
        res.json({message: error.message})
    }
    
}
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        console.log(user, (await bcrypt.compare(password, user.password)))

        const token = await generateToken(user._id)
        if (user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                name: user.name,
                email,
                token
            })
        } else {
            // res.status(401).json({message: "Invalid Credentials"})
            res.status(401)
            throw new Error('Invalid Credentials')

        }
    }
    catch(error){
        // res.status(401).json({message: "Invalid Credentials"})
        res.status(401)
        res.json({message: error.message})

    }
}

// Private
const getMe = async (req, res) => {
    const user = await req.user._id
    res.json({message: "User Details", user})
}

const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d"})
    return token
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}