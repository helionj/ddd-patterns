import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

const address = new Address("Main Street",78, "New Lake", "79010010")
const customer = new Customer("123", "Paul")
customer.changeAddress(address);

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn()
  }
}

describe("Create customer usecase unit tests", () => {
  it("should create a customer", async () => {

    const customerRepository = MockCustomerRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)
   

    const input: InputCreateCustomerDto = {
      name: "Paul",
      address: {
        street: "Main Street",
        number: 78,
        city: "New Lake",
        zip: "79010010"
      }

    };
    
    const output: OutputCreateCustomerDto = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
    
  })

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockCustomerRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)
   

    const input: InputCreateCustomerDto = {
      name: "Paul",
      address: {
        street: "Main Street",
        number: 78,
        city: "New Lake",
        zip: "79010010"
      }

    };
    input.name = "";

    const promise = usecase.execute(input);
    await expect(promise).rejects.toThrow("Name is required")
  })

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockCustomerRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)
   

    const input: InputCreateCustomerDto = {
      name: "Paul",
      address: {
        street: "Main Street",
        number: 78,
        city: "New Lake",
        zip: "79010010"
      }

    };
    input.address.street = "";

    const promise = usecase.execute(input);
    await expect(promise).rejects.toThrow("Street is required")
  })
 
})