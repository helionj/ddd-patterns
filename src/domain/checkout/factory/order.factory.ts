import Order from "../entity/Order/order"
import { v4 as uuid } from 'uuid';
import OrderItem from "../entity/OrderItem/order-item";

type OrderProps = {
  id: string,
  customerId: string,
  items: {
    id: string,
    name: string,
    productId: string,
    quantity: number,
    price: number
  }[]
}
export default class OrderFactory {

 
  public static create(orderProps: OrderProps): Order {

    const items = orderProps.items.map(item => new OrderItem(item.id,item.name,item.price,item.quantity, item.productId))
    return  new Order(orderProps.id,orderProps.customerId, items)

  }
}