import * as service from "../services/ride.service";


export async function scheduleRide(req, res, next) {
    try {
        res.status(200).json(await service.getScheduleRide());
    } catch (err) {
        next(err);
    }
}

export async function liveLocationRider(req, res, next) {
    try {
        res.status(200).json(await service.getLiveLocationRider());
    } catch (err) {
        next(err);
    }
}

export async function completeRideDetails(req, res, next) {
    try {
        res.status(200).json(await service.getCompleteRideDetails());
    } catch (err) {
        next(err);
    }
}

export async function cancleRideDetails(req, res, next) {
    try {
        res.status(200).json(await service.getCancleRideDetails());
    } catch (err) {
        next(err);
    }
}