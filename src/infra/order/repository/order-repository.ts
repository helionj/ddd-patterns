import Order from "../../../domain/checkout/entity/Order/order";
import OrderItem from "../../../domain/checkout/entity/OrderItem/order-item";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./sequelize/order-item.model";
import OrderModel from "./sequelize/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity

      }))
    }, 
    {
      include: [{ model: OrderItemModel }]
    });
  }
  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { customer_id: entity.customerId,
          total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
    
  }

  async find(id: string): Promise<Order> {
    
    const orderModel = await OrderModel.findOne({
      where: { id }, 
      include: ["items"]
    });
    return this.makeOrder(orderModel);
  }
  
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: ["items"]
    });
    return ordersModel.map(orderModel => this.makeOrder(orderModel));
  }

  makeOrder(orderModel: OrderModel): Order {

    let items: OrderItem[] = orderModel.items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
    })
    
    const order = new Order(orderModel.id,orderModel.customer_id, items);
    return order;
  }

}