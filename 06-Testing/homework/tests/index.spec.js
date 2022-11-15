const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent.post("/sumArray").send({ array: [], num: 1 }).expect(200));

    it("Evaluates false if sum of elements of array is not equal to provided number", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("Evaluates false if sum of elements of array equal to provided number", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 70 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });

  describe("POST /numString", () => {
    it("responds with status code 200", () => {
      agent.post("/numString?sfelipe").expect(200);
    });
    it("responds with status code 400 if string is a number", () => {
      agent.post("/numString?s=4").expect(400);
    });
  });
  it("responds with status code 400 if string is empty", () => {
    agent.post("/numString").expect(400);
  });
  it("responds with 4 if hola is sent", () => {
    agent
      //.post("/numString?s=hola")
      .post({ string: "hola" })
      .then((res) => expect(res.body.result).toEqual(4));
  });
  describe("/POST/pluck", () => {
    const array = [
      { name: "resaltador", price: 10 },
      { name: "lapicera", price: 5 },
      { name: "cuadernillo", price: 100 },
    ];
    it("responds with stats 200", () => {
      agent.post("/pluck").send({ array: array, prop: "name" }).expect(200);
    });
    it("responds with names", () =>
      agent
        .post("/pluck")
        .send({ array: array, prop: "name" })
        .then((res) =>
          expect(res.body.result).toEqual([
            "resaltador",
            "lapicera",
            "cuadernillo",
          ])
        ));
    it("responds with stats 404 if array is not an array", () => {
      agent.post("/pluck").send({ array: "felipe", prop: "name" }).expect(404);
    });
    it('responds with ["resaltador", "lapicera", "cuadernillo"] if called with the array', () => {
      agent
        .post("/pluck")
        .send({ array, prop: "name" })
        .then((res) => {
          expect(res.body.result).toEqual([
            "resaltador",
            "lapicera",
            "cuadernillo",
          ]);
        });
    });
  });
});
