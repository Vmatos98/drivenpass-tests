import prisma from "../config/database.js";
import {createCredentialData} from "../service/credentialService.js";

async function insertCredential(credentialData: createCredentialData){
    return await prisma.credentials.create({
        data: 
            credentialData
    });
}

async function getCredentials(userId: number){
    return await prisma.credentials.findMany({
        where: {
            userId
        }
    });
}

async function getCredentialsById(id: number, userId: number){
    return await prisma.credentials.findUnique({
        where:{
            credentialValidation:{
                id: id,
                userId: userId,
            },
        },
    })
}

async function deleteCredential(id: number , userId: number){
    return await prisma.credentials.delete({
        where:{
            credentialValidation:{
                id: id,
                userId: userId,
            },
        }
    })
}

export {
    insertCredential,
    getCredentials,
    getCredentialsById,
    deleteCredential
};