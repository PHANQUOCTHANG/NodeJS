const Roles = require('../../model/roles.model') ;

//[GET] views main roles.
module.exports.index = async (req,res) => {
    const find = {
        delete : false ,
    }

    const roles = await Roles.find(find) ;
    res.render("admin/pages/roles/index" , {
        title : "Nhóm quyền" ,
        roles : roles ,
    })
}  

//[GET] views create roles .
module.exports.create = async (req,res) => {
    res.render("admin/pages/roles/create",{
        title : "Thêm nhóm quyền" ,
    }) ;
}

// [POST] create roles .
module.exports.createPost = async (req,res) => {
        const record =  await Roles.find({delete : false}) ;
        // check roles is exits .
        console.log(record) ;
        let isCheckExits = true ;
        for (let i = 0 ; i < record.length ; i++) {
            if (record[i].title === req.body.title) {
                isCheckExits = false ;
                break ;
            }
        }
        if (!isCheckExits){
            req.flash("error" , "Roles is exits ")  ;
            res.redirect("back") ;
        }else {
            const roles = new Roles(req.body) ;
            await roles.save() ;
            req.flash("success" , "Roles is created success ") ;
            res.redirect("/admin/roles") ;
        }
}

//[GET] view permission roles .
module.exports.permission = async (req,res) => {
    const record  = await Roles.find({delete:false}) ;
    res.render("admin/pages/roles/permission" ,  {
        title : "Phân Quyền" ,
        record: record ,
    })
}

module.exports.permissionPatch = async (req,res) => {
    const permission = JSON.parse(req.body.permission)  ;
    for (let i = 0 ; i < permission.length;i++) {
        await Roles.updateOne({_id : permission[i]._id} , {permission : permission[i].permission}) ;
    }
    res.redirect("back") ;
}