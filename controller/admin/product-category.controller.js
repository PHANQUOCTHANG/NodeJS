const records = require("../../model/product-category.model") ;
const createTree = require("../../helpers/createTree") ;
// [GET] view category
module.exports.index = async (req,res) => {
    const find = {
      delete : false ,
    }
    const record = await records.find(find) ;
    res.render("admin/pages/product-category/index.pug" , {
        title : "Danh mục sản phẩm" ,
        record : record ,
    })
}


// [GET] view create category .
module.exports.create = async (req,res) => {
  const find = {
    delete : false ,
  }
  const record = await records.find(find) ;
  let parent_id ;
  const newRecord = createTree.tree(record,parent_id) ;
  console.log(newRecord) ;
    res.render("admin/pages/product-category/create.pug" , {
        title : "Danh mục sản phẩm" ,
        record : newRecord ,
    })
}

// [POST] create category.
module.exports.createPost = async (req,res) => {
    if (req.body.position === "") {
      let number = await records.countDocuments() ; // số lượng sản phẩm trong database lấy ra .
      req.body.position = number + 1 ;
    } else {
      req.body.position = parseInt(req.body.position) ;
    }
    const record = new records (req.body) ;
    await record.save() ;
    req.flash('success' , 'Add success') ; 
    res.redirect("/admin/product-category") ;
  }

// [DELETE] delete category
module.exports.deleteItem = async (req,res) =>{
  const id = req.params.id ;
  // xóa mềm (xóa tạm thời) .
  await records.updateOne({_id : id} , {
    delete : true , 
    deleteAt : new Date() ,
  }) ;

  res.redirect("back") ;
}

//[GET] views edit 
module.exports.edit = async (req,res) => {
  try {
    const id = req.params.id ;
    const find = {
      _id : id ,
      delete : false ,
    }
    const productCategory = await records.findOne(find) ;
    const record = await records.find({delete : false}) ;
    const newRecord = createTree.tree(record , "") ;
    res.render("admin/pages/product-category/edit.pug" , {
      title : "Chỉnh sửa danh mục" ,
      productCategory : productCategory,
      record : newRecord ,
    }) 
  }
  catch {
    res.redirect("/404") ;
  }
}

//[PATCH] edit product-category 
module.exports.editPatch = async (req,res) => {
  try {
    const id = req.params.id ;
    await records.updateOne({_id:id} , req.body) ;
    req.flash("success" , "Update success") ;
    res.redirect("back") ;
  }
  catch {
    res.flash("error" , "Update error") ;
    res.redirect("back") ;
  }
} 