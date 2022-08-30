const express = require("express");
const {check} = require("express-validator");
const userController = require('../controllers/user')
const router = express.Router();


router.get('/',userController.getUser)
router.get('/:name',userController.findUserById);
router.post('/signup',[
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password')
    .isLength({min:6}),
],userController.signUser);
router.post('/login',userController.loginUser);
module.exports=router;