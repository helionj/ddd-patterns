import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
export default class CreateCustomerUseCase {

  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address.street, input.address.number, input.address.city, input.address.zip)
    const customer = CustomerFactory.createWithAddress(input.name, address)
    
    await this.repository.create(customer)

     return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip
      }
     };
  
  }
}


