import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 19.99);

const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Update Prodduct usecase unit tests", () => {
  it("should update a product", async () => {

    const productRepository = MockProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)
    
    const input = {
      id: product.id,
      name: "Product Updated",
      price: 33.33
    }

    const result = await usecase.execute(input);
    expect(result).toEqual(input);
    
  })

  it("should throw an exception when product not found", async () => {
    const productRepository = MockProductRepository()
    
    const usecase = new UpdateProductUseCase(productRepository)
    
    const input = {
      id: product.id,
      name: "Product Updated",
      price: -1
    };
    
    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Price must be greater or equal than 0");
  });

  it("should throw an exception when product not found", async () => {
    const productRepository = MockProductRepository()
    productRepository.find.mockImplementation(()=> {
      throw new Error("Product not found")
    });
    const usecase = new UpdateProductUseCase(productRepository)
    
    const input = {
      id: "123",
      name: "Product Updated",
      price: 100.0
    };
    
    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
  
});