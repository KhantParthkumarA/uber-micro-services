"use strict";
const { Router } = require("express");
const { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } = require('./controller');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/product", createProduct);
route.get("/product/:id", getProduct)
route.get("/product", getAllProduct);
route.delete("/product/:id", deleteProduct);
route.patch("/product/:id", updateProduct);

module.exports = route;
