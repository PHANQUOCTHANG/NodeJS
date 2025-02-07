const Account = require("../../model/account.model") ;
const Roles = require("../../model/roles.model") ;


module.exports.requireAuth = async (req,res,next) => {
    if (req.cookies.token) {
        const user = await Account.findOne(
            {
                token : req.cookies.token , 
                delete : false ,
            }
        ).select("-password") ;
        if (!user) res.redirect("/admin/auth/login") ;
        else {
            const role = await Roles.findOne(
                {
                    _id : user.role_id ,
                    delete : false ,
                }
            ).select("title permission")
            // account login .
            res.locals.user = user  ;
            // role of account .
            res.locals.role = role ;
            next() ;
        }
    }else {
        res.redirect("/admin/auth/login") ;
    }
}