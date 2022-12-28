import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {

  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers =  await this.repository.findAll()
    return this.makeOutputCustomer(customers)
  }

  makeOutputCustomer(customers: Customer[]): OutputListCustomerDto {
  
    return {
      customers: customers.map((customer) => ({
        id:customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip
        }
  
      }))
    }
  }

}

