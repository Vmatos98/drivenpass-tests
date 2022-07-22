import supertest from "supertest";
import app from "../src/app.js"

const email = `${new Date().getDate()}@gmail.com`;
const password = "senhaforte";
const user = "user"
const login = {email: email, password: password, userName: user};

describe("auth tests suit", ()=>{
    it("given email and pass, create user",async () => {
        const response = await supertest(app).post('/sigin').send(login);
        expect(response.statusCode).toBe(201);
    })
    
    it("given email and pass, receive token", async ()=>{
        const response = await supertest(app).post('/login').send(login);
        const token = response.body.token;
        expect(token).not.toBeNull();
    })
})