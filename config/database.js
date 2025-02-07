const mongoose = require('mongoose') ;


// Kết nối database .
module.exports.connect = async (url) => {
    try {
        await mongoose.connect(url) ;
        console.log("Connect Success") ;
    }
    catch (error) {
        console.log("NO") ;
    }
}