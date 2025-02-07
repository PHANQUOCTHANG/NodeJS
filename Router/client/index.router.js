const productRouter = require("./product.router") ;
const homeRouter = require("./home.router")
const middleware = require("../../middleware/client/layoutProductCategory") ;

module.exports = (app) =>{
    app.use(middleware.layoutProductCategory) ;
    app.use('/' , homeRouter) ;
    app.use('/product' , productRouter) ;
}