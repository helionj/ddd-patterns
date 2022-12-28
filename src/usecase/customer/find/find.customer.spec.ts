import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infra/customer/repository/customer-repository";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address("Main Street",78, "New Lake", "79010010")
const customer = new Customer("123", "Paul")
customer.changeAddress(address);

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Find customer usecase unit tests", () => {
  
  
  it("should find a customer", async () => {
    
    const customerRepository = MockCustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)
   

    const input: InputFindCustomerDto = {
      id: "123",

    };
    
    const output: OutputFindCustomerDto = {
      id: "123",
      name: "Paul",
      address: {
        street: "Main Street",
        number: 78,
        city: "New Lake",
        zip: "79010010"
      }
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  })
  
  it("should throw an exception when customer not found", async () => {
    const customerRepository = MockCustomerRepository()
    customerRepository.find.mockImplementation(()=> {
      throw new Error("Customer not found")
    });

    const usecase = new FindCustomerUseCase(customerRepository)
    

    const input: InputFindCustomerDto = {
      id: "123",

    };


    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found")
  })
  
})