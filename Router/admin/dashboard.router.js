const express = require("express") ;
const router = express.Router() ;

const controllerAdminDashBoard  = require("../../controller/admin/dashboard.controller") ;
const middleware = require("../../middleware/admin/login.middleware") ;

router.get("/" , controllerAdminDashBoard.index) ;

module.exports =  router ;