const express=require('express');
const router=express.Router();

const {loginUser,addNewUser}=require('../controllers/user-controller');

router.post('/login', loginUser);
router.post('/signup', addNewUser);

module.exports=router;

