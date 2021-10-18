const app = require("../app.js");
    const request = require("supertest");
    const db = require("../database/connection/connection.js");
    const data = require("../database/data/testData/exports.js);
    const seed = require("../database/seed/seed.js");
    const fs = require("fs/promises");

    beforeEach(() => seed(data));
    afterAll(() => )

    describe("cv-site /api", () => {
        describe("/ - GET", () => {
            test("Returns all available endpoints within the api", () => {
                return request(app).get("/api").expect(200).then(async ({ body }) => {
                    const endpoints = await fs.readFile(`${__dirname}/../endpoints.json`)
                    .then(ep => ep.json());
                    expect(typeof(body.endpoints)).toBe("object");
                    expect(body.endpoints).toEqual(endpoints);
                })
            })
        }
    })
    