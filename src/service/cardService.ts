import {Cards} from "@prisma/client"
import Cryptr from "cryptr";

import * as repositories from "../repositories/cardRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET.toString());
export type createCardData = Omit<Cards, "id"|"createdAt">;


async function insertCard(createCardData:createCardData){
    const encryptedCard={...createCardData,
        number: cryptr.encrypt(createCardData.number),
        cardName: cryptr.encrypt(createCardData.cardName),
        cvv: cryptr.encrypt(createCardData.cvv),
        password: cryptr.encrypt(createCardData.password)
    }
    await repositories.insertCard(encryptedCard).catch(err=>{
        if(err.code === "P2002")
            throw { type: "unauthorized", message:"this card already exists"}
    });
}

async function getCards(userId: number){

    const data = await repositories.getCards(userId);
    if(!data)
        throw{type: "unauthorized", message: "card not found for this user"}
    
    const result = data.map(card=> {
        
        return {
            ...card,
            password: cryptr.decrypt(card.password),
            number: cryptr.decrypt(card.number),
            cardName: cryptr.decrypt(card.cardName),
            cvv: cryptr.decrypt(card.cvv)
        };
    })
    
    console.log(result);
    return result;
}

async function getOnlyCard(id: number, userId: number){
    const card = await repositories.getOnly(id, userId);
    if(!card)
        throw{type: "unauthorized", message: "card not found for this user"}
    const decryptCard={...card, 
        password: cryptr.decrypt(card.password),
        number: cryptr.decrypt(card.number),
        cardName: cryptr.decrypt(card.cardName),
        cvv: cryptr.decrypt(card.cvv)
    }

    return decryptCard;
}

async function deleteCard(id: number, userId: number){
    await repositories.deleteCard(id, userId).catch(err=>{
        if(err.code === "P2025")
            throw { type: "unauthorized", message:err.meta.cause};
    })
}

export {
    insertCard,
    getCards,
    getOnlyCard,
    deleteCard
}