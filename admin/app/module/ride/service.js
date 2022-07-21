const { Order, Rider } = require('./model')
import { success, ExistsError } from "iyasunday";
const { dataTable } = require('./../../utils/constant');



export async function getScheduleRide() {
    try {
        const order = await Order.find().populate("riderId").populate("productId").populate("driverId").populate("requestId");
        return {
            success,
            message: `You have successfully get schedule ride`,
            data: order,
        };
    } catch (err) {
        throw err;
    }
}

export async function getLiveLocationRider() {
    try {
        const location = await Rider.find({}, { liveLocation: 1, _id: 1, firstName: 1, phoneNumber: 1 });
        return {
            success,
            message: `You have successfully get rideer live location`,
            data: location,
        };
    } catch (err) {
        throw err;
    }
}