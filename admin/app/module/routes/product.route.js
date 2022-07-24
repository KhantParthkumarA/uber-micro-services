"use strict";
const { Router } = require("express");
const { createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    createSubscription,
    deleteSubscription,
    getAllSubscription,
    getSubscription,
    updateSubscription,
    subscribePlan,
    createProductType,
    deleteProductType,
    getAllProductType,
    getProductType,
    updateProductType
} = require('../controller/product.controller');
const { adminPassport } = require('./../../routes/middleware')
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route

//product
route.post("/product", adminPassport, createProduct);
route.get("/product/:id", adminPassport, getProduct)
route.get("/product", adminPassport, getAllProduct);
route.delete("/product/:id", adminPassport, deleteProduct);
route.patch("/product/:id", adminPassport, updateProduct);

//subscription
route.post("/subscription", adminPassport, createSubscription);
route.get("/subscription/:id", adminPassport, getSubscription)
route.get("/subscription", adminPassport, getAllSubscription);
route.delete("/subscription/:id", adminPassport, deleteSubscription);
route.patch("/subscription/:id", adminPassport, updateSubscription);
route.post('/subscribePlan', adminPassport, subscribePlan);

route.post("/productType", adminPassport, createProductType);
route.get("/productType/:id", adminPassport, getProductType)
route.get("/productType", adminPassport, getAllProductType);
route.delete("/productType/:id", adminPassport, deleteProductType);
route.patch("/productType/:id", adminPassport, updateProductType);
module.exports = route;
