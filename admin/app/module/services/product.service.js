import { success, ExistsError } from "iyasunday";
import models from '../model'
const { createPlan, deletePlanById, retrievePlan, addPrice } = require('./stripeService');
const { dataTable } = require('../../utils/constant');
const { getSearchRegexp } = require('./../../utils');
//Here is where you write the business logic

//Example here is a signup logic

export async function createProduct(body) {
  try {
    const isExist = await models.Product.findOne({ productID: body.productID });
    if (isExist) {
      throw new ExistsError(`${body.productID} already Exist`);
    }

    const product = await models.Product.create(body);

    return {
      success,
      message: `You have successfully created your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

export async function getAllProduct() {
  try {

    const product = await models.Product.find();
    return {
      success,
      message: `You have successfully get all product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

export async function getProduct(id) {
  try {
    const product = await models.Product.findOne({ productID: id });
    if (!product) {
      throw new ExistsError(`${id} product not Exist`);
    }
    return {
      success,
      message: `You have successfully get your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(id) {
  try {
    const product = await models.Product.deleteOne({ productID: id });

    return {
      success,
      message: `You have successfully delete your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(id, body) {
  try {
    const product = await models.Product.findOneAndUpdate({ productID: id }, { ...body }, { new: true });
    return {
      success,
      message: `You have successfully update your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}


export async function createSubscription(body) {
  try {
    const isExist = await models.Subscription.findOne({ title: body.title, price: body.price });
    if (isExist) {
      throw new ExistsError(`${body.title} already Exist`);
    }

    const plan = await createPlan(body.title, Number(body.price), body.durationType, body.duration)
    if (!plan || !plan.id) {
      throw new Error("something went wrong");
    }


    const subscription = await models.Subscription.create({ ...body, plan_id: plan.id });

    return {
      success,
      message: `You have successfully created your Subscription`,
      data: subscription,
    };
  } catch (err) {
    throw err;
  }
}

export async function getAllSubscription(params) {
  try {
    const skip = params.skip ? params.skip : dataTable.skip;
    const limit = params.limit ? params.limit : dataTable.limit;

    let searchFilter = {}
    if (params.search) {
      searchFilter = {
        $or: [
          { title: await getSearchRegexp(params.search) },
          { price: params.search },
          { duration: params.search },
        ]
      }
    }

    const subscription = await models.Subscription.find(searchFilter).skip(skip).limit(limit).sort(subscriptionsSorting).lean();
    return {
      success,
      message: `You have successfully get all Subscription`,
      data: subscription,
    };
  } catch (err) {
    throw err;
  }
}

export async function getSubscription(id) {
  try {
    const subscription = await models.Subscription.findOne({ _id: id });
    if (!subscription) {
      throw new ExistsError(`${body.title} Subscription not Exist`);
    }
    return {
      success,
      message: `You have successfully get your Subscription`,
      data: subscription,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteSubscription(id) {
  try {

    const subscription = await models.Subscription.findOne({ _id: id });
    const deletePlan = await deletePlanById(subscription.plan_id);
    if (!deletePlan) {
      throw new Error("Something went wrong");
    }

    const data = await models.Subscription.deleteOne({ _id: id });

    return {
      success,
      message: `You have successfully delete your Subscription`,
      data,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateSubscription(id, body) {
  try {
    const subscriptionObj = await models.Subscription.findOne({ _id: id })
    if (!subscriptionObj) {
      throw new Error("Something went wrong");
    }
    if (body.price && body.price !== subscriptionObj.price) {
      const planDetails = await retrievePlan(subscriptionObj.plan_id)
      if (!planDetails) {
        throw new Error("Something went wrong");
      }
      const createNewPrice = await addPrice(planDetails.product, Number(body.price), subscriptionObj.durationType, subscriptionObj.duration)
      if (!createNewPrice.id) {
        body.price = subscriptionObj.price
      }
    }
    const subscription = await models.Subscription.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
    return {
      success,
      message: `You have successfully update your Subscription`,
      data: subscription,
    };
  } catch (err) {
    throw err;
  }
}

export async function createProductType(body) {
  try {
    const isExist = await models.ProductType.findOne({ productType: body.productType });
    if (isExist) {
      throw new ExistsError(`${body.productType} already Exist`);
    }

    const productType = await models.ProductType.create(body);

    return {
      success,
      message: `You have successfully created your productType`,
      data: productType,
    };
  } catch (err) {
    throw err;
  }
}

export async function getAllProductType() {
  try {

    const productType = await models.ProductType.find();
    return {
      success,
      message: `You have successfully get all productType`,
      data: productType,
    };
  } catch (err) {
    throw err;
  }
}

export async function getProductType(id) {
  try {
    const productType = await models.ProductType.findOne({ _id: id });
    if (!productType) {
      throw new ExistsError(`${id} productType not Exist`);
    }
    return {
      success,
      message: `You have successfully get your productType`,
      data: productType,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteProductType(id) {
  try {
    const productType = await models.ProductType.deleteOne({ _id: id });

    return {
      success,
      message: `You have successfully delete your productType`,
      data: productType,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateProductType(id, body) {
  try {
    const productType = await models.ProductType.findOneAndUpdate({ _id: id }, { ...body });
    return {
      success,
      message: `You have successfully update your productType`,
      data: productType,
    };
  } catch (err) {
    throw err;
  }
}