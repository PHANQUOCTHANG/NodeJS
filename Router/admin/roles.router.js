const express = require('express') ;
const router = express.Router() ;
const controller = require("../../controller/admin/roles.controller") ;
const middleware = require("../../middleware/admin/login.middleware") ;

//[GET] views main roles .
router.get("/" , controller.index) ;

//[GET] views create roles .
router.get("/create" , controller.create) ;

//[POST] create roles .
router.post("/create" , controller.createPost) ;

//[GET] views roles permission  .
router.get("/permission" , controller.permission) ;

//[PATCH] permission roles . 
router.patch("/permission" , controller.permissionPatch) ;

module.exports = router ;


