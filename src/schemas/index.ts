import Joi from 'joi';
import {createUserData, searchUserData} from "../service/authService.js";
import {createCredentialData} from "../service/credentialService.js";
import {createNotesData} from "../service/noteService.js"
import {createCardData} from"../service/cardService.js"
import {createWifiData} from"../service/wifiService.js"

type validateCredential = Omit<createCredentialData, "userId">;
type validateNote = Omit<createNotesData, "userId">;
type validateCard = Omit<createCardData, "userId">;
type validateWifi = Omit<createWifiData, "userId">

const loginSChemaValidate = Joi.object<searchUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});

const siginSChemaValidate = Joi.object<createUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    userName: Joi.string().required()
})

const createCredentialSchemaValidate = Joi.object<validateCredential>({
    url: Joi.string().uri().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
});

const createNoteSchemaValidate= Joi.object<validateNote>({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required()
})

const createCardSchemaValidate = Joi.object<validateCard>({
    number: Joi.string().required(),
    title: Joi.string().required(),
    password: Joi.string().pattern(/^[0-9]+$/).required(),
    cardName: Joi.string().required(),
    expDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).required(),
    cvv: Joi.string().pattern(/^[0-9]+$/).length(3).required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required(),
})

const createWifiSchemaValidate = Joi.object<validateWifi>({
    ssid: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
})

export {
    loginSChemaValidate,
    siginSChemaValidate,
    createCredentialSchemaValidate,
    createNoteSchemaValidate,
    createCardSchemaValidate,
    createWifiSchemaValidate
};