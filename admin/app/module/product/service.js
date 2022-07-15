import Product from "./model";
import { success, ExistsError } from "iyasunday";

//Here is where you write the business logic

//Example here is a signup logic
export async function createProduct(body) {
  try {
    const isExist = await Product.findOne({ productID: body.productID });
    if (isExist) {
      throw new ExistsError(`${body.productID} already Exist`);
    }

    const product = await Product.save(body);

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

    const product = await Product.find();
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
    const product = await Product.findOne({ productID: id });
    if (!product) {
      throw new ExistsError(`${body.productID} product not Exist`);
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
    const product = await Product.deleteOne({ productID: id });

    return {
      success,
      message: `You have successfully delete your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(id) {
  try {
    const product = await Product.updateOne({ productID: id }, { body });
    return {
      success,
      message: `You have successfully update your product`,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

