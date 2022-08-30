const express = require("express");
const {check} = require("express-validator");
const placeController = require("../controllers/place");
const router = express.Router();

router.post('/',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description')
        .isLength({min:5}),
        check('address')
        .not()
        .isEmpty()
    ]
,placeController.createPlace)

router.get('/:pid',placeController.getByPlaceId);;



router.get('/user/:uid',placeController.getByUsersId)

router.patch('/:pid',[check('title')
.not()
.isEmpty(),
check('description')
.isLength({min:5}),
],placeController.updatedPlace);

router.delete('/:pid',placeController.deleteById);
module.exports=router;