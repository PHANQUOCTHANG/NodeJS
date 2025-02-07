const mongoose = require("mongoose") ;
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// form product-category .
const productCategorySchema = new mongoose.Schema ({
    title : String ,
    parent_id : {
        type : String ,
        default : "" ,
    } ,
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
    deleteAt : Date ,
},
{
    timestamps : true , 
}
)

const record = mongoose.model("record" , productCategorySchema , "category") ;

module.exports = record ;