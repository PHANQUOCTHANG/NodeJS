const dashBoardRouter  = require("./dashboard.router") ;
const productRouter = require("./product.router") ;
const productCategoryRouter = require("./product-category.router") ;
const rolesRouter = require('./roles.router') ;
const accountRouter = require('./account.router') ;
const authRouter = require('./auth.router') ;
const myAccountRouter = require('./my-account.router') ;
const middleware = require("../../middleware/admin/login.middleware") ;
const systemAdmin = require("../../config/system") ;

// Các router của admin .
module.exports = (app) => {
    const PATH_ADMIN = systemAdmin.prefixAdmin ;
    app.use(PATH_ADMIN + "/dashboard" ,  middleware.requireAuth , dashBoardRouter) ; 
    app.use(PATH_ADMIN + "/product" ,  middleware.requireAuth , productRouter) ; 
    app.use(PATH_ADMIN + "/product-category" ,  middleware.requireAuth , productCategoryRouter) ;
    app.use(PATH_ADMIN + "/roles" ,  middleware.requireAuth , rolesRouter) ;
    app.use(PATH_ADMIN + "/account" ,  middleware.requireAuth , accountRouter) ;
    app.use(PATH_ADMIN + "/auth" , authRouter) ;
    app.use(PATH_ADMIN + "/my-account" ,  middleware.requireAuth , myAccountRouter) ;
}