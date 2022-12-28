import Product from "../../../domain/product/entity/product";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

const product = new Product("123", "Product 1", 19.99);

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  }
}

describe("CreatePrdouctUseCase unit tests", () =>{
  it("should create a product", async () => {
    
    const productRepository = MockProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
   

    const input: InputCreateProductDto = {
      name: product.name,
      price: product.price

    };
    
    const output: OutputCreateProductDto = {
      id: expect.any(String),
      name: product.name,
      price: product.price,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
  
  it("should throw an exception when product name is missing", async () => {
    const productRepository = MockProductRepository()
    
    
    const usecase = new CreateProductUseCase(productRepository)
    
    const input: InputCreateProductDto = {
      name:"",
      price: product.price

    };
    
    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Name is required");
  });

  it("should throw an exception when product price is less than zero", async () => {
    const productRepository = MockProductRepository()
    
    
    const usecase = new CreateProductUseCase(productRepository)
    
    const input: InputCreateProductDto = {
      name:product.name,
      price: -1.0

    };
    
    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Price must be greater or equal than 0");
  });
 
});


