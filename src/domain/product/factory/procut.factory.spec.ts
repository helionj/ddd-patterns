import ProductFactory from "./product.factory";

describe("Produt factory unit test", () => {
  it("should create a product type a", () => {

    const product = ProductFactory.create("a", "Product A", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product")
  })

  it("should create a product type b", () => {

    const product = ProductFactory.create("b", "Product B", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB")
  });

  it("should throw an exception when product type not suported", () => {
    
    expect(()=> {
      const product = ProductFactory.create("x", "Product X", 1);
    }).toThrowError("Product type not suported");
  });

})