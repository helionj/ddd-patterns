import { app, sequelize } from "../express";
import request from "supertest"

describe("Product API e2e tests", () => {
  
  beforeEach(async () => {

    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {

    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 19.99
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(19.99);
    
  });

  it("should throw an error 500 when name is missing", async () => {

    const response = await request(app)
      .post("/product")
      .send({
        name: "",
        price: 19.99
      });
    expect(response.status).toBe(500);
    
  });

  it("should list all products", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      price: 19.99
    });
    expect(response.status).toBe(201);

    const response2 = await request(app)
    .post("/product")
    .send({
      name: "Product 2",
      price: 12.34
    });
    expect(response2.status).toBe(201);

    const responseList = await request(app).get("/product");

    expect(responseList.status).toBe(200);
    expect(responseList.body.products.length).toBe(2);
    expect(responseList.body.products[0].name).toBe("Product 1");
    expect(responseList.body.products[1].name).toBe("Product 2");
  });

  it("should return a product by id", async () => {
    
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      price: 19.99
    });
    expect(response.status).toBe(201);
    const productId = response.body.id

    const responseFind = await request(app).get(`/product/${productId}`);

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.name).toBe("Product 1");
    expect(responseFind.body.id).toBe(productId);
    expect(responseFind.body.price).toBe(19.99);
   
  });

})