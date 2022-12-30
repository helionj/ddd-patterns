import Address from "../value-object/address";
import Customer from "./customer"

describe('Customer unit tests', () => {

  it("should throw exception when 'id' is empty", () => {
    expect(() => {
      let customer = new Customer("", "Peter")
    }).toThrowError('customer: Id is required');
  });

  it("should throw exception when 'name' is empty", () => {
    expect(() => {
      let customer = new Customer("123", "")
    }).toThrowError('customer: Name is required');
  });

  it("should throw exception when 'id' and 'name' are empty", () => {
    expect(() => {
      let customer = new Customer("", "")
    }).toThrowError('customer: Name is required,customer: Id is required');
  });

  it("should change name", () => {

    const customer = new Customer("1", "Peter");
    customer.changeName("Anna")
    expect(customer.name).toBe("Anna")
  })

  it("should activate a customer", () => {
    const address = new Address("Rua Gloria", 56, "Campo Verde", "56000-010")
    const customer = new Customer("1", "Peter");
    customer.changeAddress(address);

    customer.activate();
    expect(customer.active).toBeTruthy();
  })

  it("should deactivate a customer", () => {
    const address = new Address("Rua Gloria", 56, "Campo Verde", "56000-010")
    const customer = new Customer("1", "Peter");
    customer.changeAddress(address);

    customer.deactivate();
    expect(customer.active).toBeFalsy()
  })

  it("should throw error when try activate a customer without an address", () => {
   
    const customer = new Customer("1", "Peter");
    
    expect(()=> {
      customer.activate()
    }).toThrowError("Address is mandactory to activate a customer");
  })

  it("should add reward ponts", () => {
    const customer = new Customer("1", "Peter");
    expect(customer.rewardPoints).toBe(0);
    customer.increaseRewards(10);
    expect(customer.rewardPoints).toBe(10);

    customer.increaseRewards(10);
    expect(customer.rewardPoints).toBe(20);
  })


});