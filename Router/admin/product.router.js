const express = require("express");
const multer = require("multer");
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const controllerProduct = require("../../controller/admin/product.controller");
const middleware = require("../../middleware/admin/login.middleware");

const uploadThumbnail = require("../../middleware/admin/uploadThumbnail");
const upload = multer();

// [GET] views product .
router.get("/", controllerProduct.index);

// [PATCH] change status one product .
router.patch("/change-status/:status/:id", controllerProduct.changeStatus);

// [PATCH] change status many product .
router.patch("/change-all", controllerProduct.changeAll);

// [DELETE] delete one product .
router.delete("/delete/:id", controllerProduct.deleteItem);

// [GET] views create product .
router.get("/create", controllerProduct.create);

// [POST] create product .
// sử dụng middleware để check xem đúng yêu cầu không nếu đúng mới tiếp tục xử kí logic .
const validate = require("../../validate/create.validate");

router.post(
  "/create",
  middleware.requireAuth,
  upload.single("thumbnail"),
  uploadThumbnail.upload,
  validate.createValidate,
  controllerProduct.createPost
);

// [GET] views edit product .
router.get("/edit/:id", controllerProduct.edit);

// [PATCH] edit product .
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadThumbnail.upload,
  validate.createValidate,
  controllerProduct.editPatch
);

// [GET] detail product .
router.get("/detail/:id", controllerProduct.detail);

module.exports = router;
