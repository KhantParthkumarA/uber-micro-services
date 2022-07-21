import { func } from "joi";
import * as service from "./service";

//Here is where you write your controller

export async function createProduct(req, res, next) {
  try {
    res.status(200).json(await service.createProduct(req.body));
  } catch (err) {
    next(err);
  }
}

export async function getAllProduct(req, res, next) {
  try {
    res.status(200).json(await service.getAllProduct());
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    res.status(200).json(await service.getProduct(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    res.status(200).json(await service.deleteProduct(req.params.id));
  } catch (err) {
    next(err);
  }
}
export async function updateProduct(req, res, next) {
  try {
    res.status(200).json(await service.updateProduct(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}



export async function createSubscription(req, res, next) {
  try {
    res.status(200).json(await service.createSubscription(req.body));
  } catch (err) {
    next(err);
  }
}

export async function getAllSubscription(req, res, next) {
  try {
    res.status(200).json(await service.getAllSubscription(req.query));
  } catch (err) {
    next(err);
  }
}

export async function getSubscription(req, res, next) {
  try {
    res.status(200).json(await service.getSubscription(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteSubscription(req, res, next) {
  try {
    res.status(200).json(await service.deleteSubscription(req.params.id));
  } catch (err) {
    next(err);
  }
}
export async function updateSubscription(req, res, next) {
  try {
    res.status(200).json(await service.updateSubscription(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}

export async function subscribePlan(req, res, next) {
  try {
    res.status(200).json(await service.subscribePlan(req.body, req.user));
  } catch (err) {
    next(err);
  }
}


