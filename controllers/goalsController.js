
const Goal = require("../models/goalsModel")
const User = require("../models/usersModel")



// Get all Goals
const getGoals = async (req, res) => {
    try {
        const data = await Goal.find({user: req.user.id})
        res.status(200).json(data)
    }catch(error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}
// Get a Goal
const getGoal = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Goal.findById(id)
        if (!data) {
            res.status(400).json({message: "Goal not found"})
            return
        }
        if (data.user.toString() === req.user.id ){
            res.status(200).json(data)
        } else {
            res.status(400).json({message: "Not Authorized"})
        }
        
    }catch(error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}
// Create a Goal
const setGoals = async (req, res) => {
    try {
        const goal = new Goal(
            {  
                user: req.user.id,
                text: req.body.text
            })
        const result = await goal.save()
        console.log(result, "rrrreeesssuuulllttt")
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
// Update a Goal
const updateGoals = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const options = { new: true}
        const goal = await Goal.findById(id)
        if (!goal) {
            res.status(400).json({message: "Goal not found"})
            return
        }
        console.log(goal)
        if (req.user.id === goal.user.toString()){
            const result = await Goal.findByIdAndUpdate(id, data, options)
            const {text} = result 
            res.status(200).json({
                id,
                text,
                message: "Updated Successfully"})
        } else {
            res.status(400).json({message: "Not Authorized"})
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
// Delete a Goal
const deleteGoals = async (req, res) => {
    try {
        const { id } = req.params
        const goal = await Goal.findById(id)
        if (!goal) {
            res.status(400).json({message: "Goal not found"})
            return
        }
        console.log(goal, "zzzzzz")
        if (req.user.id === goal.user.toString()){
            const result = await Goal.findByIdAndDelete(id)
            const {text} = result
            res.status(200).json({id, text, message: "Deleted Successfully"})
        } else {
            res.status(400).json({message: "Not Authorized"})
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getGoals,
    setGoals,
    getGoal,
    updateGoals,
    deleteGoals
}