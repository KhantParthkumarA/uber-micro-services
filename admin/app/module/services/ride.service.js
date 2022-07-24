import models from '../model';
import { success, ExistsError } from "iyasunday";
const { dataTable } = require('../../utils/constant');

export async function getScheduleRide() {
    try {
        const order = await models.Order.find().populate("riderId").populate("productId").populate("driverId").populate("requestId");
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
        const location = await models.Rider.find({}, { liveLocation: 1, _id: 1, firstName: 1, phoneNumber: 1 });
        return {
            success,
            message: `You have successfully get rideer live location`,
            data: location,
        };
    } catch (err) {
        throw err;
    }
}

export async function getCompleteRideDetails() {
    try {
        const rideDetail = await models.Order.find({ isCompleted: true });
        return {
            success,
            message: `You have successfully get Complete Ride Details`,
            data: rideDetail,
        };
    } catch (err) {
        throw err;
    }
}
export async function getCancleRideDetails() {
    try {
        const rideDetail = await models.Order.find({ status: "CANCLE" }, { _id: 1, cancleOrder: 1, status: 1 });
        return {
            success,
            message: `You have successfully get Cancle Ride Details`,
            data: rideDetail,
        };
    } catch (err) {
        throw err;
    }
}