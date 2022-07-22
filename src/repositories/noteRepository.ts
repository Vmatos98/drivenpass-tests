import prisma from "../config/database.js";
import {createNotesData} from "../service/noteService.js";

async function insertNote(createNotesData:createNotesData){
    return await prisma.notes.create({
        data: createNotesData,
    })
}

async function getNotes(userId: number){
    return await prisma.notes.findMany({
        where: {
            userId
        }
    })
}

async function getNoteById(id: number , userId: number){
    return await prisma.notes.findUnique({
        where: {
            credentialValidation:{
                id: id,
                userId: userId,
            },
        },
    })
}

async function deleteNote(id: number , userId: number){
    return await prisma.notes.delete({
        where:{
            credentialValidation:{
                id: id,
                userId: userId,
            },
        }
    })
}

export {
    insertNote,
    getNotes,
    getNoteById,
    deleteNote
}