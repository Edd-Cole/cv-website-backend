const app = require("../routers/app.js");
const request = require("supertest");
const { db, client } = require("../database/connection/connection.js");
const data = require("../database/data/testData/exports.js");
const seed = require("../database/seed/seed.js");
const fs = require("fs/promises");

beforeEach(() => seed(data));
afterAll(() => db().then(() => client.close()))

describe("cv-site /api", () => {
    describe("/ - GET", () => {
        describe("status 200 - Success", () => {
            test("Returns all available endpoints within the api", () => {
                return request(app).get("/api").expect(200).then(async({ body }) => {
                    const endpoints = await fs.readFile(`${__dirname}/../endpoints.json`)
                        .then(endpoints => JSON.parse(endpoints))
                    expect(typeof(body.endpoints)).toBe(typeof(endpoints));
                    expect(body.endpoints).toEqual(endpoints);
                })
            })
        })
    })

    describe("/articles", () => {
        describe("/ - GET", () => {
            describe("status 200 - Success", () => {
                test("Returns an array of all the articles in the database", () => {
                    return request(app)
                        .get("/api/articles")
                        .expect(200)
                        .then(response => {
                            expect(response.body.articles.length).toBeGreaterThan(0);
                            response.body.articles.forEach(article => {
                                expect(article).toMatchObject({
                                    author: expect.any(String),
                                    date: expect.any(String),
                                    title: expect.any(String),
                                    article: expect.any(String)
                                })
                            })
                        })
                })
            })
        })
    })
})