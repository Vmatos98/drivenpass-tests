import prisma from "../config/database.js";

import {createUserData, searchUserData} from "../service/authService.js";

async function findUser(searchUserData:searchUserData){
    return await prisma.users.findFirst({
        where: {
            email: searchUserData.email
        }
    });
}

async function insertUser(createUserData:createUserData){
    return await prisma.users.create({
        data: 
            createUserData
    });
}

export {
    findUser,
    insertUser
};