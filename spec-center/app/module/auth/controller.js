import * as service from './service';

export async function signup(req,res,next){
    try {
        return res.status(200).json(await service.signup(req.body))
    } catch (err) {
        next(err);
    }
}

export async function login(req,res,next){
    try {
        return res.status(200).json(await service.login(req.body))
    } catch (err) {
        next(err);
    }
}