import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerModel from "./sequelize/customer.model";
import CustomerRepository from "./customer-repository";

describe("Customer Repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync()
  });

  
  afterEach(async () => {
    await sequelize.close()
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    customerRepository.create(customer);
    
    const customerModel = await CustomerModel.findOne({ where: { id: "1"}});
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipcode: customer.address.zip,
      active: true,
      rewardPoints: 0
    });
  });

  it("should update a customer", async () => {

    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    customerRepository.create(customer);
    customer.changeName("Paul Bull");
    customer.increaseRewards(10);

    await customerRepository.update(customer)

    const productModel = await CustomerModel.findOne({ where: { id: "1"}})

    expect(productModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: "Paul Bull",
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipcode: customer.address.zip,
      active: true,
      rewardPoints: 10,

    });
  });

  it("should find one customer", async () => {

    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    customerRepository.create(customer);
    
    const customerModel = await CustomerModel.findOne({ where: { id: "1"}})
    const result = await customerRepository.find(customer.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: result.id,
      name: result.name,
      street: result.address.street,
      number: result.address.number,
      city: result.address.city,
      zipcode: result.address.zip,
      active: result.active,
      rewardPoints: result.rewardPoints,
    });
  });

  it("should find all customer", async () => {

    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    customerRepository.create(customer);
    
    const address2 = new Address("Street G",18, "Golden Lake", "99010010")
    const customer2 = new Customer("2", "Robert")
    customer2.changeAddress(address2);
    customer2.activate();
    customerRepository.create(customer2);
  
    const customers = [customer, customer2]
    const foundCustomers = await customerRepository.findAll()

    
    expect(foundCustomers).toEqual(customers);
  });

  it("should throw an exception when customer not found", () => {
    const customerRepository = new CustomerRepository()

    expect( async () => {
      await customerRepository.find("97gh");
    }).rejects.toThrow("Customer not found");
  });

});