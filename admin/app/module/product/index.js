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
    subscribePlan } = require('./controller');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route

//product
route.post("/product", createProduct);
route.get("/product/:id", getProduct)
route.get("/product", getAllProduct);
route.delete("/product/:id", deleteProduct);
route.patch("/product/:id", updateProduct);

//subscription
route.post("/subscription", createSubscription);
route.get("/subscription/:id", getSubscription)
route.get("/subscription", getAllSubscription);
route.delete("/subscription/:id", deleteSubscription);
route.patch("/subscription/:id", updateSubscription);
route.post('/subscribePlan', subscribePlan)
module.exports = route;
