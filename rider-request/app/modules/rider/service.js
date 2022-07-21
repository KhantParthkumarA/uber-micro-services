import { success, ExistsError, AuthenticationError } from "iyasunday";
const axios = require('axios');
const { Rider, Product, Fair, Requests, Subscription, Notifications, Order } = require("./model")
const { createCustomer } = require('./stripeService');
const { sentEmail } = require('./../utils/sentMail');

export async function create(body) {
  try {
    const rider = await Rider.findOne({ _id: body.id });
    if (rider) {
      throw new ExistsError(`${Insurpackage.name} already Exist`);
    }


    const riders = await Rider.create(body);

    return {
      success,
      message: `New Rider Successfully Created`,
      data: riders,
    };
  } catch (err) {
    throw err;
  }
};


export async function getRiderAndNotifications(query) {
  try {
    const rider = await Rider.findOne(query).select('-password');

    if (rider) {
      const notifications = await Notifications.find({ riderId: result._id }).sort([['createdAt', 'DESC']]).lean().exec()
      rider.notifications = notifications
    }

    return rider;
  } catch (err) {
    throw err;
  }
};


const distance_duration = async (start, end) => {

  try {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start.lat}%2C${start.lng}&destinations=${end.lat}%2C${end.lng}&key=${process.env.GOOGLE_MAP_API_KEY}`)
    // console.log(data.data.rows[0].elements);
    const distance = data.data.rows[0].elements[0].distance;
    const duration = data.data.rows[0].elements[0].duration;
    return { distance, duration };
  } catch (err) {
    throw err;
  }

}


export async function priceEstimate(body) {
  try {
    const start_lat = body.start_lat;
    const start_lng = body.start_lng;
    const end_lat = body.end_lat;
    const end_lng = body.end_lng;

    const x = distance_duration({ "lat": start_lat, "lng": start_lng }, { "lat": end_lat, "lng": end_lng })

    const product = await Product.find();
    // console.log(product);
    let response = [];
    let finalFare = 0;
    const distance = x.text;
    const duration = x.text;
    let ride_distance = distance.split(" ")[0];
    let ride_duration = duration.split(" ")[0];
    let booking_fees = 3;
    let Surge_Price = 1.5;


    for (let j = 0; j < product.length; j++) {
      let baseFare = product[j].priceDetails.base;
      let cost_per_minute = product[j].priceDetails.cost_per_minute;
      let cost_per_distance = product[j].priceDetails.cost_per_distance;

      finalFare = baseFare + (ride_duration * cost_per_minute) + (ride_distance * cost_per_distance * Surge_Price) + booking_fees;

      let obj = { ...product[j]._doc, "priceEstimate": finalFare.toFixed(2), "ride_distance": distance, "ride_duration": duration };
      response.push(obj);
    }


    return {
      success,
      message: `Price estimate get Successfully`,
      length: response.length,
      data: response,

    };
  } catch (err) {
    throw err;
  }
};




export async function timeEstimate(body) {
  try {
    const origin_lat = body.origin_lat;
    const origin_lng = body.origin_lng;
    const product_lat = body.product_lat;
    const product_lng = body.product_lng;
    const productId = body.productId;
    const x = distance_duration({ "lat": origin_lat, "lng": origin_lng }, { "lat": product_lat, "lng": product_lng })

    const product = await Product.findOne({ productID: productId });
    const duration = x.text;
    let obj = { ...product._doc, "time_duration": duration };

    return {
      success,
      message: `Time estimate get Successfully`,
      data: obj,

    };
  } catch (err) {
    throw err;
  }
};


const tollFees = async (origin, destinations, travel_mode, emission_type, toll_passes) => {
  try {

    // const url = `https://routespreferred.googleapis.com/v1alpha:computeRoutes?key=${process.env.GOOGLE_MAP_API_KEY}`;
    // const body = {
    //   "origin": {
    //     "location": {
    //       "lat_lng": origin
    //     }
    //   },
    //   "destination": {
    //     "location": {
    //       "lat_lng": destinations
    //     }
    //   },
    //   "travel_mode": travel_mode,
    //   "route_modifiers": {
    //     "vehicle_info": {
    //       "emission_type": emission_type
    //     },
    //     "toll_passes": toll_passes
    //   }
    // }
    // const tollData = await axios.post(url, body);

    // const toll = tollData.routes[0].travelAdvisory.tollInfo.estimatedPrice.units;
    // return toll;
    return 10;
  }
  catch (err) {
    throw err;
  }
}

const findCost = (baseFare, ride_duration, cost_per_minute, ride_distance, cost_per_distance, Surge_Price, booking_fees, toll) => {

  let finalFare = baseFare + (ride_duration * cost_per_minute) + (ride_distance * cost_per_distance * Surge_Price) + booking_fees + toll;
  return finalFare;
}

export async function rideRequestEstimate(body) {
  try {
    const productID = body.productID;
    const start_lat = body.start_lat;
    const start_lng = body.start_lng;
    const end_lat = body.end_lat;
    const end_lng = body.end_lng;
    const seat_count = body.seat_count;

    let product = await Product.findOne({ productID: productID, capacity: seat_count });

    if (!productID) {
      // find the cheapest product which is near to the start location of user..
    }



    const currency_code = product.priceDetails.currency_code;
    const cost_per_minute = product.priceDetails.cost_per_minute;
    const distance_unit = product.priceDetails.distance_unit;
    const cost_per_distance = product.priceDetails.cost_per_distance;
    const base = product.priceDetails.base;
    const x = await distance_duration({ "lat": start_lat, "lng": start_lng }, { "lat": end_lat, "lng": end_lng });

    const distance = x.distance;
    const duration = x.duration;

    const distance_value = (distance.value / 1000).toFixed(2);
    const duration_value = (duration.value / 60).toFixed(0);

    let trip = {
      "trip": {
        "distance_unit": distance_unit,
        "duration_estimate": duration.text,
        "distance_estimate": distance.text
      }
    }

    let Surge_Price = 1;
    const booking_fees = 10; // right now booking fees is static
    // if (ride time is between night) {
    //   Surge_Price=1.5
    // }

    const toll = await tollFees({
      "latitude": start_lat,
      "longitude": start_lng
    }, {
      "latitude": end_lat,
      "longitude": end_lng
    }, "DRIVE", "GASOLINE", "US_WA_GOOD_TO_GO")

    const ride_cost = findCost(base, duration_value, cost_per_minute, distance_value, cost_per_distance, Surge_Price, booking_fees, toll);


    // const pickup_estimate = distance_duration({ "lat": start_lat, "lng": start_lng }, { "lat": end_lat, "lng": end_lng })
    // for pickup_estimate you have to provide location of driver and location of user
    const pickup_estimate = 2;

    const fair = new Fair();
    fair.trip = trip;
    fair.display = `${ride_cost + " " + currency_code}`;
    fair.value = ride_cost;
    fair.pickup_estimate = pickup_estimate;
    fair.currency_code = currency_code;
    let breakdown = {
      "type": "base_fare",
      "value": base,
      "name": "Base Fare"
    }
    fair.breakdown = [breakdown];

    await fair.save();
    return {
      success,
      message: `Fair estimate create Successfully`,
      fair
    };
  } catch (err) {
    throw err;
  }
};

export async function rideRequest(body) {
  try {
    const fair_id = body.fair_id;
    const product_id = body.productID;
    const start_lat = body.start_lat;
    const start_lng = body.start_lng;
    const end_lat = body.end_lat;
    const end_lng = body.end_lng;

    const fair_details = await Fair.findOne({ _id: fair_id });
    const product = await Product.findOne({ productID: product_id });
    const status = "processing";  // provide status of request
    const vehicle = product; // vehicle details
    const driver = null;    // you hvae to provide driver details
    const location = {
      start: [start_lat, start_lng],
      end: [end_lat, end_lng]
    };
    const eta = fair_details.pickup_estimate;
    const surge_multiplier = null; // if night time then you have to set

    let newRequests = new Requests();

    newRequests.status = status;
    newRequests.vehicle = vehicle;
    newRequests.driver = driver;
    newRequests.location = location;
    newRequests.eta = eta;
    newRequests.surge_multiplier = surge_multiplier;
    newRequests.fair_id = fair_id;
    // console.log(newRequests);

    await newRequests.save();

    return {
      success,
      message: `ride request create Successfully`,
      newRequests

    };
  } catch (err) {
    throw err;
  }
};

export async function getCurrentRequest(body) {
  try {
    const request_id = body.request_id;

    const request = await Requests.findOne({ _id: request_id });

    return {
      success,
      message: `Get current request Successfully`,
      request

    };
  } catch (err) {
    throw err;
  }
};

export async function updateCurrentRequest(request_id, body) {
  try {

    const request = await Requests.findOneAndUpdate({ _id: request_id }, body, { new: true });

    return {
      success,
      message: `Current request update Successfully`,
      request
    };
  } catch (err) {
    throw err;
  }
};


export async function deleteCurrentRequest(request_id) {
  try {

    const request = await Requests.deleteOne({ _id: request_id });

    return {
      success,
      message: `Current request delete Successfully`,
      request
    };
  } catch (err) {
    throw err;
  }
};


export async function getRequest(body) {
  try {
    const request_id = body.request_id;

    const request = await Requests.findOne({ _id: request_id });

    return {
      success,
      message: `Get request Successfully`,
      request

    };
  } catch (err) {
    throw err;
  }
};

export async function updateRequest(request_id, body) {
  try {

    const request = await Requests.findOneAndUpdate({ _id: request_id }, body, { new: true });

    return {
      success,
      message: `Request update Successfully`,
      request
    };
  } catch (err) {
    throw err;
  }
};


export async function deleteRequest(request_id) {
  try {

    const request = await Requests.deleteOne({ _id: request_id });

    return {
      success,
      message: `Request delete Successfully`,
      request
    };
  } catch (err) {
    throw err;
  }
};


export async function getReceipt(request_id) {
  try {

    const request = await Requests.findOne({ _id: request_id });

    const fair_detail = await Fair.findOne({ _id: request.fair_id });
    console.log(fair_detail);
    const x = await distance_duration({ "lat": request.location.start[0], "lng": request.location.start[1] }, { "lat": request.location.end[0], "lng": request.location.end[1] })
    let obj = {
      "request_id": request_id,
      "subtotal": fair_detail.display,
      "duration": x.duration.text,
      "distnce": x.distance.text,
      "currency_code": fair_detail.currency_code
    }
    return {
      success,
      message: `Receipt get Successfully`,
      obj

    };
  } catch (err) {
    throw err;
  }
};


export async function getHeatMapData(request_id) {
  try {

    const data = await Requests.find();
    console.log(data);
    let response = [];

    data.forEach(element => {
      response.push(element.location.start);
    });

    return {
      success,
      message: `Get heatmap data Successfully`,
      response

    };
  } catch (err) {
    throw err;
  }
};


export async function pushFavDriver(rider_id, driver_id) {
  try {

    const rider = await Rider.findOne({ _id: rider_id });

    const favRider = rider.favouriteDriver;
    if (!favRider.includes(driver_id)) {
      favRider.push(driver_id);
      rider.favouriteDriver = favRider;
      await Rider.findOneAndUpdate({ _id: rider_id }, rider, { new: true });

    }

    return {
      success,
      message: `Favourite driver add Successfully`,
      rider
    };
  } catch (err) {
    throw err;
  }
};


export async function updateWaitingCharge(rider_id, minute) {
  try {

    const freeMinute = 10; // get from admin side
    const charge = 0.5 //get from admin side

    let obj = {
      "minute": minute,
      "freeMinute": freeMinute,
      "charge": charge
    }

    const rider = await Requests.update({ _id: rider_id }, {
      $set: {
        waitingCharge: obj
      }
    })

    return {
      success,
      message: `Update waiting charge Successfully`,
      rider
    };
  } catch (err) {
    throw err;
  }
};


export async function subscribePlan(body, user) {
  try {
    const userObj = user
    const subscriptionDetails = await Subscription.findOne({ _id: body.id })
    if (!subscriptionDetails) {
      throw Error("Subscription plan not found");
    }


    let body = {};
    let subscription;

    if (body.inAppToken) {
      body = {
        subscriptions: body.subscription,
        inAppToken: body.inAppToken
      }
    } else {
      if (!userObj.stripe.customerId) {
        const customer = await createCustomer(userObj.email, body.token)
        userObj.stripe.customerId = customer.id

        // update user with stripe customer id
        // await usersService.updateUser({ 'stripe.customerId': customer.id }, { _id: userObj._id })
      }


      subscription = !body.inAppToken && await stripeSubscriptionService.createSubscription(subscriptionDetails.plan_id, userObj.stripeCustomerId, body.paymentMethod)
      /** app subscription includes the inAppToken */
      body = {
        'stripe.planId': subscriptionDetails.plan_id,
        'stripe.subscriptionId': subscription.id,
        subscriptions: subscriptionDetails._id
      }
    }

    //update user
    // await usersService.updateUser(
    //   body,
    //   { _id: userObj._id }
    // )
    const sub = 'Subscription'
    let html = `<p>Dear ${userObj.email.split('@')[0]},</p><p>You have subscribed to ${subscriptionDetails.title} Plan for ${subscriptionDetails.duration} days on ${subscriptionDetails.title} basis.</p><p>Should you have any queries or if any of your details change, please contact us.</p><p>Best regards,<br>Paymax</p><p><strong>( *&nbsp; Please do not reply to this email *&nbsp; )</strong></p>`



    const result = await sentEmail(userObj.email, sub, html);
    if (!result) {
      throw Error("Something went wrong");
    }

    return {
      success,
      message: `Subscription plan create Successfully`,
      data: !body.inAppToken ? {
        subscriptionStatus: subscription.status,
        customerEmail: userObj.email
      } : { subscriptions: subscriptionDetails._id }
    };


  } catch (e) {
    throw e;
  }
};


/** Get notifications */
export async function getUserNotifications(query) {
  try {
    const notificationDetails = await Notifications.find(query).sort([['createdAt', 'DESC']]).lean().exec()
    return notificationDetails
  } catch (e) {
    throw new Error(e)
  }
}

/** Delete notifications */
export async function deleteNotifications(query) {
  try {
    await Notifications.deleteMany(query, { new: true })
    return true
  } catch (e) {
    throw new Error(e)
  }
}

/** Create notifications */
export async function createNotification(body) {
  try {
    await Notifications.create(body);
    return true;
  } catch (e) {
    throw new Error(e)
  }
}

export async function createOrder(body) {
  try {
    const order = await Order.create(body);

    return {
      success,
      message: `Order create Successfully`,
      order
    };
  } catch (err) {
    throw err;
  }
};

export async function getOrder(id) {
  try {
    const order = await Order.findOne({ _id: id });

    return {
      success,
      message: `Order get Successfully`,
      order
    };
  } catch (err) {
    throw err;
  }
};


export async function getAllOrder() {
  try {
    const order = await Order.find();

    return {
      success,
      message: `Order get Successfully`,
      order
    };
  } catch (err) {
    throw err;
  }
};

export async function updateOrder(body, id) {
  try {
    const order = await Order.update({ _id: id }, {
      $set: body
    });

    return {
      success,
      message: `Order update Successfully`,
      order
    };
  } catch (err) {
    throw err;
  }
};

