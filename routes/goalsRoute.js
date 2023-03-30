const express = require('express');
const { getGoals, getGoal, setGoals, updateGoals, deleteGoals } = require('../controllers/goalsController');
const protect = require('../middleware/authMiddleware')

const router = express.Router();

// Get all and Post a goal
router.route('/').get(protect, getGoals).post(protect, setGoals)

// router.get('/', getGoals);
// router.post('/', setGoals);


// Get, Update and Delete a Goal
router.route('/:id').get(protect, getGoal).put(protect, updateGoals).delete(protect, deleteGoals)

// router.get('/:id', getGoal);
// router.put('/:id', updateGoals);
// router.delete('/:id', deleteGoals);




module.exports = router