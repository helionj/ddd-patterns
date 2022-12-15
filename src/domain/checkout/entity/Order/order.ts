import OrderItem from "../OrderItem/order-item";

export default class Order {
  private _id: string;
  private _customerID: string;
  private _items: OrderItem[] = [];
  private _total: number;
  
 constructor (id: string, customerID: string, items: OrderItem[]) {
  this._id = id;
  this._customerID = customerID;
  this._items = items;
  this._total = this.total();
  this.validate();
 }

 public total(): number {
  return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
 }

 get id () {
  return this._id;
 }
 get customerId () {
  return this._customerID;
 }
 get items () : OrderItem[] {
  return this._items;
 }

 changeCustomerId (customerId: string) {
  this._customerID = customerId;
 }

 addItem(item: OrderItem){
  this._items.push(item)
  this._total = this.total();
 }

 validate() {
  if (this._id.length === 0) {
    throw new Error("Id is required");
  }
  if (this._customerID.length === 0) {
    throw new Error("CustomerID is required");
  }

  if (this._items.length === 0) {
    throw new Error("Items quantity must be greater than 0");
  }
  return true;
}
}