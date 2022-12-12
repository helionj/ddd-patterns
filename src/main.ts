import Address from "./domain/entity/Address/address";
import Customer from "./domain/entity/Customer/customer";
import Order from "./domain/entity/Order/order";
import OrderItem from "./domain/entity/OrderItem/order-item";

let customer = new Customer("123", "Paulo Pereira Porto");
const address = new Address("Rua Aroeira", 56, "Campo Grande", "79010-010");
customer.Address = address;
customer.activate;

const item1 = new OrderItem("1", "Tablet Samsung 4 Pro", 765.90, 1, "p1");
const item2 = new OrderItem("2", "Smartphone Samsung Alfa Pro", 932.90, 1, "p2")

let items: OrderItem[] =[];
items.push(item1);
items.push(item2);

const order = new Order("1", "c1", items )