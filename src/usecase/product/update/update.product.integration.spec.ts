import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/product-repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a","Product 1",20.99);

describe("Product use case update integration tests", () => {
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

  it("should update  a product", async () => {
    
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const usecase = new UpdateProductUseCase(productRepository);


    const input = {
      id: product.id,
      name: "Product 1 updated",
      price: 19.99

    };

    const output = {
      id: product.id,
      name: "Product 1 updated",
      price: 19.99

    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);

  });

  it("should throw an error when product for update no exists", async () => {
    
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const usecase = new UpdateProductUseCase(productRepository);


    const input = {
      id: "123",
      name: "Product 1 updated",
      price: 19.99

    };
   
    await expect(()=> {
      return usecase.execute(input)
    }).rejects.toThrow("Product not found");

  });

  it("should throw an error when prodcut price is less than zero", async () => {
    
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const usecase = new UpdateProductUseCase(productRepository);


    const input = {
      id: product.id,
      name: "Product 1 updated",
      price: -1

    };
   
    await expect(()=> {
      return usecase.execute(input)
    }).rejects.toThrow("Price must be greater or equal than 0");

  });
  it("should throw an error when prodcut name is missing", async () => {
    
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const usecase = new UpdateProductUseCase(productRepository);


    const input = {
      id: product.id,
      name: "",
      price: 10.0

    };
   
    await expect(()=> {
      return usecase.execute(input)
    }).rejects.toThrow("Name is required");

  });
});