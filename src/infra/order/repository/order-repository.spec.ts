import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import Order from "../../../domain/checkout/entity/Order/order";
import OrderItem from "../../../domain/checkout/entity/OrderItem/order-item";
import Product from "../../../domain/product/entity/product";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./sequelize/order-item.model";
import OrderModel from "./sequelize/order.model";
import ProductModel from "../../product/repository/sequelize/product.model";
import CustomerRepository from "../../customer/repository/customer-repository";
import ProductRepository from "../../product/repository/product-repository";
import OrderRepository from "./order-repository";

describe("Order Repository tests", () => {
 
  
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  
  afterEach(async () => {
    await sequelize.close()
  });
  
  
  it("should create a new order", async () => {
    
    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product-1", 10.0);
    await productRepository.create(product);
    
    const orderItem = new OrderItem("1", product.name, product.price,1, product.id);
    
    const order = new Order("1",customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id }, 
      include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 10,
      items: [
        {
          id: "1",
          name: product.name,
          price: product.price,
          quantity: 1,
          product_id: product.id,
          order_id: "1"
        }
      ]
    });
  
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product-1", 10.0);
    await productRepository.create(product);
    
    const orderItem = new OrderItem("1", product.name, product.price,1, product.id);
    
    const order = new Order("1",customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customer2 = new Customer("2", "Mario");
    customer2.Address= address;
    customer2.activate();
    await customerRepository.create(customer2);

    const product2 = new Product("456", "Product-2", 30.0);
    await productRepository.create(product2);
    
    orderItem.changePrice(15);
    const orderItem2 = new OrderItem("2", product2.name, product2.price,2, product2.id);
    order.addItem(orderItem2);
    order.changeCustomerId(customer2.id);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({ 
      where: {id: order.id}, 
      include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "2",
      total: 75,
      items: [
        {
          id: "1",
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1"
        },
        {
          id: "2",
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: orderItem2.productId,
          order_id: "1"
        }
      ]

    });

  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product-1", 10.0);
    await productRepository.create(product);
    
    const orderItem = new OrderItem("1", product.name, product.price,1, product.id);
    
    const order = new Order("1",customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.find(order.id)
    expect(orderFound).toStrictEqual(order);

  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Main Street",78, "New Lake", "79010010")
    const customer = new Customer("1", "Paul")
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product-1", 10.0);
    await productRepository.create(product);
    
    const orderItem = new OrderItem("1", product.name, product.price,1, product.id);
    
    const order = new Order("1",customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const address2 = new Address("Z Street",88, "Silver Lake", "89010010")
    const customer2 = new Customer("2", "Bob")
    customer2.changeAddress(address2);
    customer2.activate();
    await customerRepository.create(customer2);
    
    const product2 = new Product("321", "Product-2", 20.0);
    await productRepository.create(product2);
    
    const orderItem2 = new OrderItem("2", product2.name, product2.price,2, product2.id);
    
    const order2 = new Order("2",customer2.id, [orderItem2]);
   
    await orderRepository.create(order2);
    
    const orders = [order, order2];
    const ordersFound = await orderRepository.findAll();
    
    expect(ordersFound).toEqual(orders);
  })

});