import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product";
import ProductModel from "./sequelize/product.model";
import ProductRepository from "./product-repository";

describe("Product Respository tests", () =>{
  
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync()
  });

  
  afterEach(async () => {
    await sequelize.close()
  });

  it("should create a product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product-1", 10.0);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1"}})

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product-1",
      price: 10.0

    })
  });

  it("should update a product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product-1", 10.0);
    await productRepository.create(product);
    product.changePrice(20.0)
    product.changeName("TV 50p")
    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: "1"}})

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "TV 50p",
      price: 20.0

    })
  });

  it("should find one product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product-1", 10.0);
    await productRepository.create(product);
    
    const productModel = await ProductModel.findOne({ where: { id: "1"}})
    const result = await productRepository.find(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: result.id,
      name: result.name,
      price: result.price

    })
  })

  it("should find all product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product-1", 10.0);
    await productRepository.create(product);
    
    const product2 = new Product("2", "Product-2", 20.0);
    await productRepository.create(product2);
    const products = [product, product2]
    const foundProducts = await productRepository.findAll()

    
    expect(foundProducts).toEqual(products);
  });

});