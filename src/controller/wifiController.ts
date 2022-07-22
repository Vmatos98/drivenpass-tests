import {Request, Response} from "express";
import * as service from "../service/wifiService.js";

async function createWifiController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    await service.insertWifi({...req.body, userId});
    res.sendStatus(201);
}

async function getWifiController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const result = await service.getWifi(userId);
    res.status(200).send(result);
}

async function getOnlyWifiController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const cardId = +req.params.id;
    const result  = await service.getOnlyWifi(cardId, userId);
    res.status(200).send(result);
}

async function deleteWifiController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const cardId = +req.params.id;
    await service.deleteWifi(cardId, userId);
    res.sendStatus(201)
}

export{
    createWifiController,
    getWifiController,
    getOnlyWifiController,
    deleteWifiController

}