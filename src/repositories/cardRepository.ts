import prisma from "../config/database.js";
import {createCardData} from "../service/cardService.js"


async function insertCard(createCardData:createCardData){
    return await prisma.cards.create({
        data: createCardData,
    });
}

async function getCards(userId: number){
    return await prisma.cards.findMany({
        where:{
            userId,
        },
    })
}

async function getOnly(id: number , userId: number){
    return await prisma.cards.findUnique({
        where: {
            credentialValidation:{
                id: id,
                userId: userId,
            },
        },
    })
}

async function deleteCard(id: number , userId: number){
    return await prisma.cards.delete({
        where:{
            credentialValidation:{
                id: id,
                userId: userId,
            },
        }
    })
}

export {
    insertCard,
    getCards,
    getOnly,
    deleteCard
}