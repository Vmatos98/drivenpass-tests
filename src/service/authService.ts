import bcrypt from 'bcrypt';
import {Users} from "@prisma/client"
import * as authRepository from "../repositories/authRepository.js";

export type createUserData = Omit<Users, "id"|"createdAt">;
export type searchUserData = Omit<createUserData, "userName">;

async function findUser(searchUserData:searchUserData){
    const user = await authRepository.findUser(searchUserData);
    if(bcrypt.compareSync(searchUserData.password, user.password)){
        return user;
    }
    throw { type: "unauthorized", message: "invalid email or password" };
}

async function createUser(createUserData:createUserData){
    const { email, userName} = createUserData;
    const password = bcrypt.hashSync(createUserData.password, 10);
    const user = await authRepository.insertUser({email, password, userName});
    return user;
}


export {
    findUser,
    createUser
};