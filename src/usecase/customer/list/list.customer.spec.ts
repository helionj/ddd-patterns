import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const address1 = new Address("Street One", 33, "New City", "55000031");
const address2 = new Address("Street Two", 45, "Old Citry", "65000061");
const customer1 = CustomerFactory.createWithAddress("Paulo", address1);
const customer2 = CustomerFactory.createWithAddress("Marcos", address2);

const MockCustomerRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}


describe("List customers usecase unit tests", () => {
  it("should return  a list of customer", async () => {

    const customerRepository = MockCustomerRepository()
    const usecase = new ListCustomerUseCase(customerRepository)
   

    const result = await usecase.execute();
    expect(result.customers.length).toBe(2);
    expect(result.customers[0].id).toBe(customer1.id)
    expect(result.customers[0].name).toBe(customer1.name)
    expect(result.customers[0].address.street).toBe(customer1.address.street)
    expect(result.customers[0].address.number).toBe(customer1.address.number)
    expect(result.customers[0].address.city).toBe(customer1.address.city)
    expect(result.customers[0].address.zip).toBe(customer1.address.zip)
    expect(result.customers[1].id).toBe(customer2.id)
    expect(result.customers[1].name).toBe(customer2.name)
    expect(result.customers[1].address.street).toBe(customer2.address.street)
    expect(result.customers[1].address.number).toBe(customer2.address.number)
    expect(result.customers[1].address.city).toBe(customer2.address.city)
    expect(result.customers[1].address.zip).toBe(customer2.address.zip)
  })
  
})
