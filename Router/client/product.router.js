const express = require ("express") ;
const router = express.Router() ;
const controllerProduct = require("../../controller/client/product.controller") ;

// [GET] views product .
router.get("/", controllerProduct.index)  ;;

// [GET] detail product .
router.get("/detail/:id" , controllerProduct.detail) ;

//  [GET] product by category .
router.get("/:slug" , controllerProduct.slug) ;
module.exports = router ;