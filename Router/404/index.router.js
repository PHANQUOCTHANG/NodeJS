const error = require('./404') ;

module.exports = (app) => {
    app.use("/404" , error) ;
}