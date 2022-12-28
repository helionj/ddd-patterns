import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infra/product/repository/product-repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Product use case integration tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);


    const input = {
      name: "Product 1",
      price: 10.99

    };

    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 10.99

    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);

  });

 
  
});