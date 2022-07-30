const mongoose = require('mongoose');

const productSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Name'],
    trim: true, //to remove spaces from beginning and end
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter product Price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      //cloudNavi is used to host our images
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please Enter Product Category'],
  },
  Stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxLength: [4, 'Stock cannot exceed 4 characters'],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      Comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
