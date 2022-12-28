import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 19.99);
const product2 = ProductFactory.create("a", "Product 2", 43.21);

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("List products usecase unit tests", () => {
  it("should return  a list of product", async () => {

    const productRepository = MockProductRepository()
    const usecase = new ListProductUseCase(productRepository)
   

    const result = await usecase.execute({});
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
   
  })
  
})