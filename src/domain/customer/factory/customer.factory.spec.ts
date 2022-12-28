import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {
  
  it("should create a customer", () => {

    const customer = CustomerFactory.create("Customer");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with Address", () => {

    const address = new Address("Bela Vista", 22, "Belo Vale", "31956-000");
    const customer = CustomerFactory.createWithAddress("Customer", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Customer");
    expect(customer.address).toEqual(address);
  })
})