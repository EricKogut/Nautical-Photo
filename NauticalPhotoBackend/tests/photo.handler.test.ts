// Getting server and testing deps
const server = require("../server.ts");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);


const userHandler = require("../handlers/user.handler.ts");
