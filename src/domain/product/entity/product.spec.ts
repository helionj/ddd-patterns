import Product from "./product";

describe("Product unit tests", () => {
  
  it("should throw exception when 'id' is empty", () => {

    expect(() => {
      const product = new Product("", "Product 1", 100.0)
    }).toThrowError('product: Id is required');
  });

  it("should throw exception when 'name' is empty", () => {

    expect(() => {
      const product = new Product("1", "", 100.0)
    }).toThrowError('product: Name is required');
  });

  it("should throw exception when 'price' is less than 0", () => {

    expect(() => {
      const product = new Product("1", "Product 1", -1)
    }).toThrowError('product: Price must be greater or equal than 0');
  });

  it("should change name", () => {

    const product = new Product("1", "Product 1", 1)
    product.changeName("New nome product")
    expect(product.name).toBe("New nome product")
  });

  it("should change price", () => {

    const product = new Product("1", "Product 1", 1)
    product.changePrice(10.00)
    expect(product.price).toBe(10.00)
  });

  it("should throw exception when calls changeName with name empty", () => {
    const product = new Product("1", "Product 1", 1);
    expect(() => {
      product.changeName("");
    }).toThrowError('product: Name is required');
  });

  it("should throw exception when calls changePrice with price less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", 1)
      product.changePrice(-2)
    }).toThrowError('product: Price must be greater or equal than 0');
  });

  it("should trow exception when id and name are empty", () => {
    expect(() => {
      const product = new Product("", "", 1);
    }).toThrowError('product: Id is required,product: Name is required')
  });
  it("should trow exception when id and name are empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError('product: Id is required,product: Name is required,product: Price must be greater or equal than 0')
  })
})