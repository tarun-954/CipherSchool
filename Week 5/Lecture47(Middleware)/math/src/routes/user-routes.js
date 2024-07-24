const express=require('express');
const router=express.Router();

const {loginUser,addNewUser,deleteUser}=require('../controllers/user-controller');

router.post('/login', loginUser);
router.post('/signup', addNewUser);
router.delete('/:id',deleteUser);

module.exports=router;

