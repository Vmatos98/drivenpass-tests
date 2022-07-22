import prisma from "../config/database.js";
import {createWifiData} from "../service/wifiService.js";


async function insertWifi(createWifiData:createWifiData){
    return await prisma.wifi.create({
        data: createWifiData,
    })
}

async function getWifi(userId: number){
    return await prisma.wifi.findMany({
        where: {
            userId,
        }
    })
}

async function getOnlyWifi(id: number , userId: number){
    return await prisma.wifi.findUnique({
        where: {
            credentialValidation:{
                id: id,
                userId: userId,
            },
        }
    })
}

async function deleteWifi(id: number , userId: number){
    return await prisma.wifi.delete({
        where:{
            credentialValidation:{
                id: id,
                userId: userId,
            },
        }
    })
}

export {
    insertWifi,
    getWifi,
    getOnlyWifi,
    deleteWifi
}