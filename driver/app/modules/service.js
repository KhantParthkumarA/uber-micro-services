import { success, ExistsError, AuthenticationError } from "iyasunday";
const { Driver, Product, Order, Requests } = require('./model')
const jwt = require('jsonwebtoken');


const setAuth = async (driver) => {
  const token = await jwt.sign({ id: driver._id }, process.env.JWT_SECRET);
  return token;
}

export async function signup(body) {
  try {
    const isExist = await Driver.findOne({ email: body.email });
    if (isExist) {
      throw new ExistsError(`${body.email} already Exist`);
    }
    if (body.phoneNumber) {
      const phoneExist = await Driver.findOne({ phoneNumber: body.phoneNumber });
      if (phoneExist) {
        throw new ExistsError("Driver with Phone Number already exists");
      }

    }

    const driver = await Driver.create({ ...body });
    return {
      success,
      message: `You have successfully created your account`,
      data: {
        token: await setAuth(driver),
        driver
      }

    };
  } catch (err) {
    throw err;
  }
}


export async function login(body) {
  try {
    const email = body.email;
    const password = body.password;

    const driver = await Driver.findOne({ email: email }).select('+password');

    if (!driver) {
      throw new Error("Incorrect email and password");
    }

    const correct = await driver.correctPassword(password, driver.password);

    if (!correct) {
      throw new Error("Incorrect email and password");
    }


    return {
      success,
      message: `You have successfully login`,
      data: await setAuth(driver),
    };
  } catch (err) {
    throw err;
  }
}



export async function updateVehicleDetail(driverId, productId, body) {
  try {

    const driver = await Driver.findOne({ _id: driverId });
    let res;
    if (driver.status === "APPROVE") {
      const product = await Product.findOne({ _id: productId })

      if (product._id === driver.product_id) {
        res = await Driver.update({ _id: productId }, { $set: { vehicleDetails: body }, productId })
      }
    }
    else {
      throw new Error("Driver not approve");
    }


    return {
      success,
      message: `Vehicle detail update Successfully`,
      data: res,
    };
  } catch (err) {
    throw err;
  }
};

export async function updateETA(driverId, body) {
  try {
    const driver = await Driver.findOne({ _id: driverId });
    let res;
    if (driver.status === "APPROVE") {
      res = await Driver.update({ _id: driverId }, { $set: { eta: body } })
    }
    else {
      throw new Error("Driver not approve");
    }

    return {
      success,
      message: `ETA detail update Successfully`,
      data: res,
    };
  } catch (err) {
    throw err;
  }
};

export async function cancleRide(driverId, orderId, body) {
  try {
    let obj = {
      cancleBy: "DRIVER",
      reason: body.reason
    }
    const cancle = await Order.update({ _id: orderId, driverId: driverId }, {
      $set: {
        cancleOrder: obj,
        status: "CANCLERIDE"
      }
    })

    return {
      success,
      message: `Ride cancle Successfully`,
      data: cancle,
    };
  } catch (err) {
    throw err;
  }
};

export async function updateStatus(driverId, orderId, body) {
  try {
    const statusUpdate = await Order.update({ _id: orderId, driverId: driverId }, {
      $set: {
        status: body.status
      }
    })

    return {
      success,
      message: `Update Ride status Successfully`,
      data: statusUpdate,
    };
  } catch (err) {
    throw err;
  }
};

export async function confirmRequest(body) {
  try {

    const driverId = body.driverId;
    const productId = body.productId;
    const fairId = body.fairId;
    const requestId = body.requestId;

    const updateReq = await Requests.update({ _id: requestId }, { $set: { driverId: driverId, productId: productId, fairId: fairId } });

    body.isConfirmByDriver = true;
    const order = await Order.create(body)

    return {
      success,
      message: `Ride confirm successfully and order created`,
      data: order,
    };
  } catch (err) {
    throw err;
  }
};

export async function getUpcomingTrip(driverId) {
  try {
    const order = await Order.find({ driverId: driverId, isCompleted: false })

    return {
      success,
      message: `Upcoming ride get successfully`,
      data: order,
    };
  } catch (err) {
    throw err;
  }
};