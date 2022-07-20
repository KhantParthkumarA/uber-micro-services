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


export async function createDriver(req, res, next) {
  try {
    res.status(200).json(await service.createDriver(req.body));
  } catch (err) {
    next(err);
  }
}

export async function getAllDriver(req, res, next) {
  try {
    res.status(200).json(await service.getAllDriver());
  } catch (err) {
    next(err);
  }
}

export async function getDriver(req, res, next) {
  try {
    res.status(200).json(await service.getDriver(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteDriver(req, res, next) {
  try {
    res.status(200).json(await service.deleteDriver(req.params.id));
  } catch (err) {
    next(err);
  }
}
export async function updateDriver(req, res, next) {
  try {
    res.status(200).json(await service.updateDriver(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}
