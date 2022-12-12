import Order from "./order";
import OrderItem from "../OrderItem/order-item";

describe("Order tests", () => {
  it("should throw exception when 'id' is empty", () => {

    const item1 = new OrderItem("1", "Tablet Samsung 4 Pro", 765.90, 1, "1");

    expect(() => {
      const order = new Order("", "1", [item1])
    }).toThrowError('Id is required');
  });

  it("should throw exception when 'CustomerID' is empty", () => {

    const item1 = new OrderItem("1", "Tablet Samsung 4 Pro", 765.90, 1, "1");
    expect(() => {
      const order = new Order("1", "", [])
    }).toThrowError('CustomerID is required');
  });

  it("should throw exception when 'Items' is empty", () => {
    expect(() => {
      const order = new Order("1", "123", [])
    }).toThrowError('Items quantity must be greater than 0');
  });

  it("should calculate value total of items", () => {
    
    const item1 = new OrderItem("1", "Tablet Samsung 4 Pro", 100, 2, "1");
    const item2 = new OrderItem("2", "TV  50 samsung", 300, 1, "2");
    const order = new Order("1", "123", [item1, item2])

    expect(order.total()).toBe(500.00)
  })

})