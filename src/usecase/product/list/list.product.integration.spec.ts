import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/product-repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 19.99);
const product2 = ProductFactory.create("a", "Product 2", 43.21);

describe("Product use case list integration tests", () => {
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

  it("should return a  product list", async () => {
    
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);
    const usecase = new ListProductUseCase(productRepository);

    const result = await usecase.execute({});
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);

  });

  
});