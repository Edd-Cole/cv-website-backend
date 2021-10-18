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

        describe("/ - POST", () => {
            describe("status 201 - Created", () => {
                test("Returns and adds a new article into the database", () => {
                    return request(app)
                        .post("/api/articles")
                        .send({
                            author: "Jane",
                            date: new Date(),
                            title: "Bang",
                            article: "That's the sound balloons make when they burst!"
                        })
                        .expect(201)
                        .then(response => {
                            expect(response.body.article).toEqual({
                                author: "Jane",
                                date: expect.any(String),
                                title: "Bang",
                                article: "That's the sound balloons make when they burst!"
                            })
                        })
                })
            })
        })

        describe("/:title", () => {
            describe("/ - GET", () => {
                describe("status 200 - Success", () => {
                    test("Returns a single article given by the article title", () => {
                        return request(app)
                            .get("/api/articles/James_Bond")
                            .expect(200)
                            .then(response => {
                                expect(response.body.article).toEqual({
                                    author: "Billy Bob",
                                    date: expect.any(String),
                                    title: "James Bond",
                                    article: "I love Bond, I have every film ever made"
                                })
                            })
                    })
                })
            })

            describe("/ - PATCH", () => {
                describe("status 200 - Success", () => {
                    test("Updates and returns an article given by the article title", () => {
                        return request(app)
                            .patch("/api/articles/James_Bond")
                            .send({
                                article: "The name's Bond... Jeremy Bond"
                            })
                            .expect(200)
                            .then(response => {
                                expect(response.body.article).toEqual({
                                    author: "Billy Bob",
                                    date: expect.any(String),
                                    title: "James Bond",
                                    article: "The name's Bond... Jeremy Bond"
                                })
                            })
                    })
                })
            })
        })
    })
})