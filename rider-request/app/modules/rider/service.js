import { success, ExistsError, AuthenticationError } from "iyasunday";
const axios = require('axios');
const { Rider, Product } = require("./model")

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

const findDistance = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat}%2C${origin.lng}&destinations=${destination.lat}%2C${destination.lng}&key=${process.env.GOOGLE_MAP_API_KEY}`;
  const response = await axios.get(url)
  return response.data;
}

export async function priceEstimate(body) {
  try {
    // const start_lat = body.start_lat;
    // const start_lng = body.start_lng;
    // const end_lat = body.end_lat;
    // const ent_lng = body.end_lng;

    const data = {
      "destination_addresses": ["Lexington, MA, USA", "Concord, MA, USA"],
      "origin_addresses": ["Boston, MA, USA", "Charlestown, Boston, MA, USA"],
      "rows":
        [
          {
            "elements":
              [
                {
                  "distance": { "text": "33.3 km", "value": 33253 },
                  "duration": { "text": "27 mins", "value": 1620 },
                  "duration_in_traffic": { "text": "34 mins", "value": 2019 },
                  "status": "OK",
                },
              ],
          },
          {
            "elements":
              [
                {
                  "distance": { "text": "31.1 km", "value": 31100 },
                  "duration": { "text": "26 mins", "value": 1543 },
                  "duration_in_traffic": { "text": "29 mins", "value": 1754 },
                  "status": "OK",
                },
              ],
          },
        ],
      "status": "OK",
    }
    const product = await Product.find();
    // console.log(product);
    let response = [];
    for (let i = 0; i < data.rows.length; i++) {
      let finalFare = 0;
      const distance = data.rows[i].elements[0].distance.text;
      const duration = data.rows[i].elements[0].duration.text;
      let ride_distance = distance.split(" ")[0];
      let ride_duration = duration.split(" ")[0];
      let booking_fees = 3;
      let Surge_Price = 1.5;


      for (let j = 0; j < product.length; j++) {
        let baseFare = product[j].priceDetails.base;
        let cost_per_minute = product[j].priceDetails.cost_per_minute;
        let cost_per_distance = product[j].priceDetails.cost_per_distance;

        finalFare = baseFare + (ride_duration * cost_per_minute) + (ride_distance * cost_per_distance * Surge_Price) + booking_fees;

        let obj = { ...product[j]._doc, "priceEstimate": finalFare.toFixed(2) };
        response.push(obj);
      }


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