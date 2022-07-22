import {Request, Response} from "express";
import * as service from "../service/noteService.js"

async function createNoteController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    await service.insertNote({...req.body, userId});
    res.sendStatus(201);
}

async function getNoteController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const result = await service.getNotes(userId);
    res.status(200).send(result);
}

async function getOnlyNoteController(req: Request, res: Response) {
    const userId = res.locals.decoded.userId;
    const noteId = +req.params.id;
    const result = await service.getOnly(noteId, userId);
    res.status(200).send(result);
}

async function deleteNoteController(req: Request, res: Response){
    const userId = res.locals.decoded.userId;
    const noteId = +req.params.id;
    await service.deleteNote(noteId, userId);
    res.sendStatus(201);
}

export {
    createNoteController,
    getNoteController,
    getOnlyNoteController,
    deleteNoteController
}