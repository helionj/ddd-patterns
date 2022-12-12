import Customer from "../../entity/Customer/customer"
import Order from "../../entity/Order/order"
import OrderItem from "../../entity/OrderItem/order-item"
import OrderService from "./order-service"

describe("OrderService unit tests", () => {

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("it1", "item1",10.0, 1, "p1");
    const order = OrderService.placeOrder(customer, [item1]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  })

  it("should calculate total value of all orders", () => {

    const item1 = new OrderItem("it1", "item1",10.0, 1, "p1")
    const item2 = new OrderItem("it2", "item2",20.0, 3, "p2")
    const item3 = new OrderItem("it3", "item3",30.0, 3, "p3")
    const item4 = new OrderItem("it4", "item4",40.0, 1, "p4")
    const order1 = new Order("1", "cus1", [item1, item2]);
    const order2 = new Order("2", "cus2", [item3, item4])

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(200);
  })
})