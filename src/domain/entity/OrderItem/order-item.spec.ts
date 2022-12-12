import OrderItem from "./order-item"

describe("OrderItem units test", () => {
  
  it("should throw exception when quantity is less or equal than 0", () => {

    expect(() => {
      const item = new OrderItem("1", "Item-1", 10.0, 0, "p1")
    }).toThrowError("Quantity should to be greater than 0")
    
  })
})