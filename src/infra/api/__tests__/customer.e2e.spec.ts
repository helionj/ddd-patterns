import { app, sequelize } from "../express";
import request from "supertest"
describe("Customer API e2e tests", () => {
  
  beforeEach(async () => {

    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {

    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main street",
          number: 10,
          city: "New Hope",
          zip: "55000555"
        }
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Main street");
    expect(response.body.address.number).toBe(10);
    expect(response.body.address.city).toBe("New Hope");
    expect(response.body.address.zip).toBe("55000555");
  });

  it("should throw an error 500 when name is missing", async () => {

    const response = await request(app)
      .post("/customer")
      .send({
        name: "",
        address: {
          street: "Main street",
          number: 10,
          city: "New Hope",
          zip: "55000555"
        }
      });
    expect(response.status).toBe(500);
    
  });

  it("should list all customers", async () => {
    const response = await request(app)
    .post("/customer")
    .send({
      name: "John Doe",
      address: {
        street: "Main street",
        number: 10,
        city: "New Hope",
        zip: "55000555"
      }
    });
    expect(response.status).toBe(201);

    const response2 = await request(app)
    .post("/customer")
    .send({
      name: "Mary Doe",
      address: {
        street: "Avenue center",
        number: 40,
        city: "New Hope",
        zip: "55000555"
      }
    });
    expect(response2.status).toBe(201);

    const responseList = await request(app).get("/customer");

    expect(responseList.status).toBe(200);
    expect(responseList.body.customers.length).toBe(2);
    expect(responseList.body.customers[0].name).toBe("John Doe");
    expect(responseList.body.customers[1].name).toBe("Mary Doe");
  });

  it("should return a customer by id", async () => {
    
    const response = await request(app)
    .post("/customer")
    .send({
      name: "John Doe",
      address: {
        street: "Main street",
        number: 10,
        city: "New Hope",
        zip: "55000555"
      }
    });
    expect(response.status).toBe(201);
    const customerId = response.body.id

    

    const responseFind = await request(app).get(`/customer/${customerId}`);

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.name).toBe("John Doe");
    expect(responseFind.body.id).toBe(customerId);
    expect(responseFind.body.address.street).toBe("Main street");
    expect(responseFind.body.address.number).toBe(10);
    expect(responseFind.body.address.city).toBe("New Hope");
    expect(responseFind.body.address.zip).toBe("55000555");
  });


})