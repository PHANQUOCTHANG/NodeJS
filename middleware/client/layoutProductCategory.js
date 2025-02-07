const ProductCategory = require("../../model/product-category.model")

const createTreeHelper = require("../../helpers/createTree")

module.exports.layoutProductCategory = async (req, res , next) => {
  const productCategory = await ProductCategory.find({ delete: false });
  const layoutProductCategory = createTreeHelper.tree(productCategory);
  res.locals.layoutProductCategory = layoutProductCategory;
  next() ;
};
