const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/); // expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const completelaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };
  const launchdataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-186 f",
  };
  const launchDatawithinvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-186 f",
    launchDate: "zoot",
  };

  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completelaunchData)
      .expect(201)
      .expect("Content-Type", /json/);
    const requestDate = new Date(completelaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchdataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchdataWithoutDate)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDatawithinvalidDate)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
