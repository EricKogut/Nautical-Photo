// Getting server and testing deps
const server = require("../server.ts");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

// Will be used to generate usernames
var rug = require("random-username-generator");
var new_username = rug.generate();

/* Test to get all public user photos*/
describe("GET /get/public", () => {
  it("This test will get all the public pictures", async () => {
    const res = await requestWithSupertest
      .get("/photo/get/public")
      .setHeader("Content-Type", "application/json")
      .expect(200);
    expect(res.status).toEqual(200);
  });
});
