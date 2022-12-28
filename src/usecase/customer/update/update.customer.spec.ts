import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const address = new Address("Main Street",78, "New Lake", "79010010")
const customer = CustomerFactory.createWithAddress("Paul", address)

const input = {
  id: customer.id,
  name: "Paul Updated",
  address:{
    street: "Street updated",
    number: 100,
    city: "New Lake updated",
    zip: "79010010 updated"
  }
}

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Update customer usecase unit tests", () => {
  it("should update a customer", async () => {

    const customerRepository = MockCustomerRepository()
    const usecase = new UpdateCustomerUseCase(customerRepository)
   

    const result = await usecase.execute(input);
    expect(result).toEqual(input);
    
  })
  
})