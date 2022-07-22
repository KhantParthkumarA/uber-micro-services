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
} = require('./controller');
const { verifyLogin } = require('./../../routes/auth-middleware')
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route

//product
route.post("/product", verifyLogin, createProduct);
route.get("/product/:id", verifyLogin, getProduct)
route.get("/product", verifyLogin, getAllProduct);
route.delete("/product/:id", verifyLogin, deleteProduct);
route.patch("/product/:id", verifyLogin, updateProduct);

//subscription
route.post("/subscription", verifyLogin, createSubscription);
route.get("/subscription/:id", verifyLogin, getSubscription)
route.get("/subscription", verifyLogin, getAllSubscription);
route.delete("/subscription/:id", verifyLogin, deleteSubscription);
route.patch("/subscription/:id", verifyLogin, updateSubscription);
route.post('/subscribePlan', verifyLogin, subscribePlan)

module.exports = route;
