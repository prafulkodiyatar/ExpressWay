const Product = require('../models/productModel');
const errorHander = require('../utils/errorHander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({ success: true, products, productCount });
});

//productDetails
exports.productDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander('product not found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product -admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander('product not found'), 404);
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander('product not found', 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    massage: 'product deleted successfully',
  });
});
