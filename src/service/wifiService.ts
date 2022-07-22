import {Wifi} from "@prisma/client"
import Cryptr from "cryptr";

import * as repositories from "../repositories/wifiRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
export type createWifiData = Omit<Wifi, "id"|"createdAt">;

async function insertWifi(createWifiData:createWifiData){
    const encryptedWifi = {...createWifiData, 
        ssid: cryptr.encrypt(createWifiData.ssid),
        password: cryptr.encrypt(createWifiData.password)
    }
    await repositories.insertWifi(encryptedWifi);
}

async function getWifi(userId: number){
    const wifi = await repositories.getWifi(userId);
    if(!wifi)
        throw { type: "not_found", message:"wifi not found"};

    const result = wifi.map(data=>{
        return {
            ...data,
            ssid: cryptr.decrypt(data.ssid),
            password: cryptr.decrypt(data.password)
        };
    });

    return result;
}

async function getOnlyWifi(id: number, userId: number){
    const wifi = await repositories.getOnlyWifi(id, userId);
    if(!wifi)
        throw { type: "not_found", message:"wifi not found"};

    const result = {
            ...wifi,
            ssid: cryptr.decrypt(wifi.ssid),
            password: cryptr.decrypt(wifi.password)
        }

    return result;
}

async function deleteWifi(id: number, userId: number){
    console.log(id);
    
    await repositories.deleteWifi(id, userId).catch(err=>{
        if(err.code === "P2025")
            throw { type: "unauthorized", message:err.meta.cause}
    })
}


export {
    insertWifi,
    getWifi,
    getOnlyWifi,
    deleteWifi
}