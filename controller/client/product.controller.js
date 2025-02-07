const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const category = require("../../helpers/sub-menu");
const {
  layoutProductCategory,
} = require("../../middleware/client/layoutProductCategory");
// [GET] get product views .
module.exports.index = async (req, res) => {
  const products = await Product.find({ delete: false });
  res.render("client/pages/product/index", {
    title: "Danh sách sản phẩm",
    products: products,
  });
};

// [GET] detail product .
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const find = {
    delete: false,
    _id: id,
  };
  const product = await Product.findOne(find);
  res.render("client/pages/product/detail.pug", {
    title: "Chi tiết sản phẩm",
    product: product,
  });
};
// [GET] get product views by category .
module.exports.slug = async (req, res) => {
  const slug = req.params.slug;
  const productCategory = await ProductCategory.findOne({
    slug: slug,
    delete: false,
  });
  const getSub = async (parent_id) => {
    const subs = await ProductCategory.find({
      parent_id: parent_id,
      delete: false,
    });
    let AllSub = [...subs];
    for (let sub of subs) {
      const child = await getSub(sub.id);
      AllSub = AllSub.concat(child);
    }
    return AllSub;
  };
  const listProductCategory = await getSub(productCategory.id) ;
  const newListProductCategory = listProductCategory.map(item => item.id) ;
  console.log(newListProductCategory) ;
  const products = await Product.find({
    product_category_id: {$in : [productCategory.id , ...newListProductCategory]} ,
    delete: false,
  });
  res.render("client/pages/product/slug.pug", {
    products: products,
  });
};
