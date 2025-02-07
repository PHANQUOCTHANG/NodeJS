const express = require('express') ;
const router = express.Router() ;
const multer = require('multer') ;
const upload = multer() ;

const controller = require('../../controller/admin/account.controller') ;
const uploadThumbnail = require('../../middleware/admin/uploadThumbnail') ;
const validate = require('../../validate/create.validate') ;
const middleware = require("../../middleware/admin/login.middleware") ;

//[GET] views list account admin .
router.get('/' , controller.index) ;

//[GET] views create account .
router.get('/create' ,controller.create) ;

//[POST] create account .
router.post('/create' , upload.single("avatar") , uploadThumbnail.upload , validate.createValidateAccount , controller.createPost) ;




module.exports = router ;