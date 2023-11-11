//
//  product{
//      name: String,
//      price: Number,
//      description: String,
//      quantity: Number,
//      unit: String,
//  }
//

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    price:{
        type:"Number",
        required:true
    },
    description:{
        type:"String"
    },
    quantity:{
        type:"Number",
        required:true
    },
    unit:{
        type:"String",
        required:true,
        default:"kg"
    }
})

module.exports = mongoose.model('Product',productSchema);