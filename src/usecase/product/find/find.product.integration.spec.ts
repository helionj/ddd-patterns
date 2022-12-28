import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/product-repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";

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

  it("should find a product", async () => {
    
    const product = new Product("123", "Product 1", 19.99)
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price

    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);

  });

  it("should throw an exception when product not found", async () => {
    
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");

  });
  
});