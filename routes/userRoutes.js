const express = require('express');
const { getAllUsers, getUser, addUser, updateUser, deleteUser } = require('../controllers/UserController');

// route object
const router = express.Router();

// routes
router.get('/list', getAllUsers)
router.get('/get/:id', getUser)
router.post('/add', addUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router