const mongoose = require("mongoose") ;
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// form product .
const productSchema = new mongoose.Schema ({
        title : String , 
        product_category_id : String ,
        price : Number , 
        status : String ,
        thumbnail : String ,
        description : {
            type : String , 
            default : "" ,
        } ,
        delete :{
            type: Boolean ,
            default: false ,
        } ,
        position : Number , 
        slug : {
            type : String ,
            slug : "title" , 
            unique : true 
        },
        createBy : {
            account_id : String , 
            createAt : {
                type : Date , 
                default : Date.now ,
            }
        } ,
        deleteBy : {
            account_id : String , 
            deleteAt : Date ,
        } ,  
        updateBy : [
            {
                account_id : String ,
                updateAt : Date ,
            },
        ] , 
    })

const Product = mongoose.model("Product" , productSchema , "product") ;

module.exports = Product ;