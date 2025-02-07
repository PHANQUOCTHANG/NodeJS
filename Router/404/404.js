const express = require('express') ;
const router = express.Router() ;
const controller = require("../../controller/404/404.controller") ;

router.get("/" , controller.index) ;

module.exports = router ;