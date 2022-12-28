import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {

  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
     const customer = await this.repository.find(input.id)

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