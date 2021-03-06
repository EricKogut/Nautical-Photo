// Getting server and testing deps
const server = require("../server.ts");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

// Will be used to generate usernames
var rug = require("random-username-generator");
var new_username = rug.generate();


/* Test to create user account, and sign in*/
describe("Register and Login test", () => {
  let username = rug.generate();
  const testUser = {
    email: username + "@" + "mail.com",
    username: username,
    password: username,
  };

  it("Will register a new user", async () => {
    const res = await requestWithSupertest
      .post("/user/register")
      .setHeader("Content-Type", "application/json")
      .send(testUser);
    expect(res.status).toEqual(200);
  });

  it("Will login an existing user", async () => {
    const res = await requestWithSupertest
      .post("/user/login")
      .setHeader("Content-Type", "application/json")
      .send(testUser);
    expect(res.status).toEqual(200);
  });
});




