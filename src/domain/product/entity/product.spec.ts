import Product from "./product";

describe("Product unit tests", () => {
  it("should throw exception when 'id' is empty", () => {

    expect(() => {
      const product = new Product("", "Product 1", 100.0)
    }).toThrowError('Id is required');
  });

  it("should throw exception when 'name' is empty", () => {

    expect(() => {
      const product = new Product("1", "", 100.0)
    }).toThrowError('Name is required');
  });

  it("should throw exception when 'price' is less than 0", () => {

    expect(() => {
      const product = new Product("1", "Product 1", -1)
    }).toThrowError('Price must be greater or equal than 0');
  });

  it("should change name", () => {

    const product = new Product("1", "Product 1", 1)
    product.changeName("New nome product")
    expect(product.name).toBe("New nome product")
  });

  it("should throw exception when calls changeName with name empty", () => {

    expect(() => {
      const product = new Product("1", "Product 1", 1)
      product.changeName("")
    }).toThrowError('Name is required');
  });


  it("should change price", () => {

    const product = new Product("1", "Product 1", 1)
    product.changePrice(10.00)
    expect(product.price).toBe(10.00)
  });

  it("should throw exception when calls changePrice with price less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", 1)
      product.changePrice(-2)
    }).toThrowError('Price must be greater or equal than 0');
  })
})