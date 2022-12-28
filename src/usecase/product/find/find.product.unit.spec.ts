import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a","Product 1",20.99);

const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("FindPrdouctUseCase unit tests", () =>{
  it("should find a product", async () => {
    
    const productRepository = MockProductRepository()
    const usecase = new FindProductUseCase(productRepository)
   

    const input: InputFindProductDto = {
      id: product.id,

    };
    
    const output: OutputFindProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an exception when product not found", async () => {
    const productRepository = MockProductRepository()
    productRepository.find.mockImplementation(()=> {
      throw new Error("Product not found")
    });
    
    const usecase = new FindProductUseCase(productRepository)
    
    const input: InputFindProductDto = {
      id: "123",
    };
    
    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
  
});
