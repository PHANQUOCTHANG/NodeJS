const { render } = require("pug");
const Product = require("../../model/product.model");
const Product_category = require("../../model/product-category.model") ;

// [GET] views product .
module.exports.index = async (req, res) => {
    const status = req.query.status;
    const find = {
      delete : false ,
    };
    if (status) find.status = status;
    let keyword = "";
    if (req.query.keyword) {
      keyword = req.query.keyword;
      const regex = new RegExp(keyword, "i");
      find.name = regex;
    }

    const objPage = {
      limit: 3,
      currentPage: 1,
    };

    if (req.query.page) {
      objPage.currentPage = parseInt(req.query.page);
    }

    objPage.skip = (objPage.currentPage - 1) * objPage.limit;

    const sizePage = await Product.countDocuments(find);

    objPage.totalPage = Math.ceil(sizePage / objPage.limit);

    // object sort

    let sort = {}  
    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey;
      const sortValue= req.query.sortValue ;
      //khi thêm 1 key trong object mà key đó đang ở dạng string thì không thể dùng dấu '.' mà phải dùng  object[key]  .
        sort[sortKey] = sortValue ; 
    } else {
        sort.position =  "desc" ; // key  không ở dạng string .
    }
    // End object sort 

    const product = await Product.find(find)
      .sort(sort)   
      .limit(objPage.limit)
      .skip(objPage.skip);
    res.render("admin/pages/product/index", {
      title : "Danh sách sản phẩm" ,
      product: product,
      keyword: keyword,
      objPage: objPage,
    });
};

// [PATCH] change all status .
module.exports.changeAll = async (req,res) =>{
    const updateBy = {
      account_id : res.locals.user.id ,
      updateAt : new Date() ,
    }
    const id = req.body.id ;
    const type = req.body.type ;
    const ids = req.body.ids.split(", ") ;
    console.log(ids) ;
    
    switch(type) {
      case "active" :
        await Product.updateMany({_id : {$in:ids}} , 
          {
            status:"active" ,
            $push : {updateBy : updateBy} , 
          }
        ) ;
        break ;
      case "inactive":
        await Product.updateMany({_id : {$in:ids}} , {
          status:"inactive" ,
          $push : {updateBy : updateBy} , 
        }) ;
        break ;
      case "delete":
        const deleteBy = {
          account_id : res.locals.user.id ,
          deleteAt : new Date() ,
        }
        await Product.updateMany({_id : {$in:ids}} , {delete:true , deleteBy : deleteBy }) ;
        break;
      case "update-position" :
          ids.forEach( async (item)=>{
            let [id,position] = item.split("-") ;
            position = parseInt(position) ;
            await Product.updateOne({_id:id},{
              position : position ,
              $push : {updateBy : updateBy} , 
            }) ;
          })
      default : 
        break ;
    }


  //  res.redirect("back") ;
}


// [PATCH] change status product.
module.exports.changeStatus = async (req , res) => {
    const status = req.params.status ;
    const id = req.params.id ;
    await Product.updateOne({_id : id} , {status : status}) ;
    req.flash('info' , 'Update Success') ;
    res.redirect("back") ;
}

// [DELETE] delete product .

module.exports.deleteItem = async (req,res) =>{
  const id = req.params.id ;
  const deleteBy = {
    account_id : res.locals.user.id ,
    deleteAt : new Date() ,
  }
  // xóa mềm (xóa tạm thời) .
  await Product.updateOne({_id : id} , {
    delete : true , 
    deleteBy : deleteBy ,
  }) ;
  res.redirect("back") ;
}


// [GET] views create product .
module.exports.create = async (req,res) => {
  const product_category = await Product_category.find({delete:false}) ;
  res.render("admin/pages/product/create" , {
    title :"Thêm sản phẩm" ,
    record : product_category ,
  }) ;
}


// [POST] create product .
module.exports.createPost = async (req,res) => {
  req.body.price = parseInt(req.body.price) ;
  if (req.body.position === "") {
    const number = await Product.countDocuments() ; // số lượng sản phẩm trong database lấy ra .
    req.body.position = number + 1 ;
  } else {
    req.body.position = parseInt(req.body.position) ;
  }
  req.body.createBy = {
    account_id  : res.locals.user.id ,
    createAt : new Date() ,
  }
  const product = new Product (req.body) ;
  await product.save() ;
  req.flash('success' , 'Add success') ; 
  res.redirect("/admin/product") ;
}

// [GET] views edit product .
module.exports.edit = async (req,res) => {
  try {
    // get id of product want edit .
    const id = req.params.id ;
    const find = {
      delete : false ,
      _id : id ,
    }
    const product = await Product.findOne(find) ;
    res.render("admin/pages/product/edit" , {
      title : "Chỉnh sửa sản phẩm" ,
      product : product ,
    }) ;
  }
  catch {
    res.redirect("/404") ;
  }
}

// [PATCH] edit product .
module.exports.editPatch = async (req,res) => {
  try {
    const updateBy =  {account_id : res.locals.user.id , updateAt : new Date()} ;
    const id = req.params.id ;
    await Product.updateOne({_id:id} , {
      ...req.body , 
      $push: {updateBy : updateBy} ,
    });
    req.flash("success" , "Update success") ;
    res.redirect("back") ;
  }
  catch {
    res.redirect("/404 ") ;
  }
}

// [GET] detail product .
module.exports.detail = async (req,res) => {
  const id = req.params.id ;
  const find = {
    delete : false ,
    _id : id
  }
  const product = await Product.findOne(find) ;
  res.render("admin/pages/product/detail" , {
    title : "Chi tiết sản phẩm" ,
    product : product 
  }) 
}
