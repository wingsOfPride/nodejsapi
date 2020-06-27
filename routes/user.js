const express = require('express');
const {userById,allUsers, getUser, updateUser, deleteUser} = require('../controllers/user');
const router = express.Router()
const { requireSignin} = require('../controllers/auth')


//get user
router.get('/users', allUsers);

//get user per id
router.get('/user/:userId',requireSignin, getUser);

//update
router.put("/user/:userId", requireSignin, updateUser);

//delete
router.delete("/user/:userId", requireSignin, deleteUser);


router.param("userId", userById)


module.exports = router;