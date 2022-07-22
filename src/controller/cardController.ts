import {Request, Response} from "express";
import * as service from "../service/cardService.js"

async function createCardController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    await service.insertCard({...req.body, userId});
    res.sendStatus(201);
}

async function getCardsController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const cards = await service.getCards(userId);
    res.status(200).send(cards);
}

async function getOnlyCardController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const cardId = +req.params.id;
    const result  = await service.getOnlyCard(cardId, userId);
    res.status(200).send(result);
}

async function deleteCardController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const cardId = +req.params.id;
    await service.deleteCard(cardId, userId);
    res.sendStatus(201)
}

export {
    createCardController,
    getCardsController,
    getOnlyCardController,
    deleteCardController
}