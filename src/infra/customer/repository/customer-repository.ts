import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./sequelize/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  
  async create(entity: Customer): Promise<void> {

    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.active,
      rewardPoints: entity.rewardPoints
    })
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.active,
        rewardPoints: entity.rewardPoints
      }, 
      {
        where: {
          id: entity.id
        },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({ 
        where: 
          { 
            id 
          }, 
          rejectOnEmpty: true
        });
      return this.makeCustomer(customerModel);
    } catch (error) {
      throw new Error("Customer not found");
      
    }
    
    
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    
    return customerModels.map(customerModel => this.makeCustomer(customerModel));
  }

  makeCustomer(customerModel: CustomerModel): Customer {
    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipcode);
    customer.changeAddress(address);
    customer.active = customerModel.active;
    customer.rewardPoints = customerModel.rewardPoints;
    return customer;
  }

}