import {Request, Response} from "express";
import * as credentialService from "../service/credentialService.js";

async function createCredential(req: Request, res: Response) {
    const userId = res.locals.decoded.userId;
    const  data = {...req.body, userId};
    await credentialService.createCredential(data);
    res.sendStatus(201);
}

async function getCredentials(req: Request, res: Response) {
    const userId = res.locals.decoded.userId;
    const credentials = await credentialService.getCredentials(userId);
    res.status(200).send(credentials);
}

async function getCredentialsById(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const credentialId = +req.params.id;
    const credentialResult  = await credentialService.getOnly(credentialId, userId);
    res.status(200).send(credentialResult);
}

async function deleteCredential(req: Request, res: Response) {
    const userId = res.locals.decoded.userId;
    const credentialId = +req.params.id;
    await credentialService.deleteCredential(credentialId, userId);
    res.sendStatus(201);
}

export{
    createCredential,
    getCredentials,
    getCredentialsById,
    deleteCredential
}