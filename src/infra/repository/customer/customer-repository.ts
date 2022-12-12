import Address from "../../../domain/entity/Address/address";
import Customer from "../../../domain/entity/Customer/customer";import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import CustomerModel from "../../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  
  async create(entity: Customer): Promise<void> {

    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.active,
      rewardPoints: entity.rewardPoints
    })
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
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
    customer.Address = address;
    customer.active = customerModel.active;
    customer.rewardPoints = customerModel.rewardPoints;
    return customer;
  }

}