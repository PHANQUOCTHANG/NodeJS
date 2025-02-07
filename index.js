const express = require("express") ;
const path = require('path') ;
const methodOverride = require("method-override") ; // chồng phương thứcthức
var bodyParser = require('body-parser') ; // lấy body  trên sever .
var flash = require('express-flash') ; // thông báo .
var cookieParser = require('cookie-parser') ;
var session = require('express-session') ;
require("dotenv").config() ;

const database = require("./config/database") ;
const url = process.env.URL ;
database.connect(url) ;
const systemConfig = require("./config/system") ;

const routerAdmin = require("./Router/admin/index.router.js")
const router = require("./Router/client/index.router.js") ;


const app = express() ;

// method override
app.use(methodOverride('_method')) ;
// end

// body-parser .
app.use(bodyParser.urlencoded({ extended: false })) ;
// end

// flash
app.use(cookieParser('Phan Quoc Thang'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end



const port = process.env.PORT ;
app.locals.prefixAdmin = systemConfig.prefixAdmin ;

// file public.
app.use(express.static("public")) ;
// end


// tiny mce 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end


app.set("views" , "./views") ;
app.set("view engine" ,"pug") ;

routerAdmin(app) ; // admin .
router(app) ; // client .
//404
const error = require('./Router/404/index.router.js') ;
error(app) ;
app.listen (port , () => {
    console.log(port) ;
})
