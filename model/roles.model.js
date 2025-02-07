const mongoose = require("mongoose") ;

// form model roles (Nhóm quyền) .
const rolesSchema = new mongoose.Schema ({
        title : String , 
        description : {
            type : String , 
            default : "" ,
        } ,
        permission : {
            type : Array ,
            default : [] ,
        } ,
        delete :{
            type: Boolean ,
            default: false ,
        } , 
        deleteAt : Date ,
    },
    {
        timestamps : true , 
    }
    )

const Roles = mongoose.model("Roles" , rolesSchema , "roles") ;

module.exports = Roles ;