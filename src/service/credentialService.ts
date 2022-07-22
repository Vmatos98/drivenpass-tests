import {Credentials} from "@prisma/client";
import Cryptr from "cryptr";

import * as credentialRepository from "../repositories/credentialRepository.js";

export type createCredentialData = Omit<Credentials, "id"|"createdAt">;
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

async function createCredential(credentialData: createCredentialData){
    const encryptedPassword = cryptr.encrypt(credentialData.password);
    const credential = {...credentialData, password: encryptedPassword};
    await credentialRepository.insertCredential(credential).catch(err => {
        if(err.code === "P2002"){
            throw {type: "conflict", message: "credential title already exists"};
        }
    });
}

async function getCredentials(userId: number){
    const result = await credentialRepository.getCredentials(userId);
    if(!result){
        throw {type: "notFound", message: "credentials not found"};
    }
    const data = result.map(credential => {
        const decryptedPassword = cryptr.decrypt(credential.password);
        return {...credential, password: decryptedPassword};
    }
    );
    return data;
}

async function getOnly(id: number, userId: number){
    const result = await credentialRepository.getCredentialsById(id, userId);
    if(!result){
        throw { type: "unauthorized", message: "credential not found for this user"}
    }
    const decryptedPassword = cryptr.decrypt(result.password);
    return {...result, password: decryptedPassword};
}

async function deleteCredential(id: number, userId: number){
    await credentialRepository.deleteCredential(id, userId).catch(err=>{
        if(err.code === "P2025")
            throw { type: "unauthorized", message:err.meta.cause}
    })
}

export {
    createCredential,
    getCredentials,
    getOnly,
    deleteCredential
}