import {Notes} from "@prisma/client"
import Cryptr from "cryptr";

import * as repositories from "../repositories/noteRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
export type createNotesData = Omit<Notes, "id"|"createdAt">;

async function insertNote(createNotesData:createNotesData){
    const{content} = createNotesData;
    const encryptedContent = cryptr.encrypt(content);
    const encryptedNote = {...createNotesData, content: encryptedContent};
    await repositories.insertNote(encryptedNote);
}

async function getNotes(userId: number){
    const notes = await repositories.getNotes(userId);
    if(!notes) throw{type: "unauthorized", message: "note not found for this user"}
    const result = notes.map(note=>{
        const decryptedNote = cryptr.decrypt(note.content);
        return {...note, content: decryptedNote};
    })
    return result;
}

async function getOnly(id: number, userId: number){
    const note = await repositories.getNoteById(id, userId);
    if(!note) throw{type: "unauthorized", message: "note not found for this user"}
    const decryptedNote = cryptr.decrypt(note.content);
    const result = {...note, content: decryptedNote};
    return result;
}

async function deleteNote(id: number, userId: number){
    await repositories.deleteNote(id, userId).catch(err=>{
        if(err.code === "P2025")
            throw { type: "unauthorized", message:err.meta.cause};
    })
}

export{
    insertNote,
    getNotes,
    getOnly,
    deleteNote
};