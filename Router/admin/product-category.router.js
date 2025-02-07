const express = require("express") ;
const router = express.Router() ;
const multer = require("multer") ;
const upload = multer() ;


const controller = require("../../controller/admin/product-category.controller") ;
const uploadThumbnail = require("../../middleware/admin/uploadThumbnail") ;
const middleware = require("../../middleware/admin/login.middleware") ;

// [GET] views product-category.
router.get("/" ,  controller.index) ;


// [GET] views create product-category .
router.get("/create" ,  controller.create) ;


//[POST] create category .
const validate = require("../../validate/create.validate");
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadThumbnail.upload , 
  validate.createValidate,
  controller.createPost
);

//[DELETE] delete category .
router.delete("/delete/:id" , controller.deleteItem) ;

//[GET] views edit 
router.get("/edit/:id" ,  controller.edit) ;

//[PATCH] edit product-category
router.patch("/edit/:id" , 
  upload.single("thumbnail"),
  uploadThumbnail.upload , 
  validate.createValidate,
  controller.editPatch
) ;
module.exports = router ;

