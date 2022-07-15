import * as service from './service';

export async function create(req, res, next) {
    try {
        return res.status(200).json(await service.create(req.body))
    } catch (err) {
        next(err);
    }
}

export async function getPriceEastimate(req, res, next) {
    try {
        return res.status(200).json(await service.priceEstimate(req.query))
    } catch (err) {
        next(err);
    }
}