import { success, ExistsError, AuthenticationError } from "iyasunday";
const axios = require('axios');
const { Rider, Product, Fair, Requests } = require("./model")

export async function create(body) {
  try {
    const rider = await Rider.findOne({ _id: body.id });
    if (rider) {
      throw new ExistsError(`${Insurpackage.name} already Exist`);
    }

    const newRider = new Rider();
    newRider.riderFirstName = body.riderFirstName;
    newRider.riderLastName = body.riderLastName;
    newRider.email = body.email;
    newRider.phoneNumber = body.phoneNumber;
    newRider.password = body.password
    await newRider.save();

    return {
      success,
      message: `New Rider Successfully Created`,
      data: newRider,
    };
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




const findCost = (baseFare, ride_duration, cost_per_minute, ride_distance, cost_per_distance, Surge_Price, booking_fees) => {

  let finalFare = baseFare + (ride_duration * cost_per_minute) + (ride_distance * cost_per_distance * Surge_Price) + booking_fees;
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

    const ride_cost = findCost(base, duration_value, cost_per_minute, distance_value, cost_per_distance, Surge_Price, booking_fees);


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