export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _productID: string;

  constructor (id: string, name: string, price: number, quantity: number, productID: string) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productID = productID;
    this.validate();
  }

  get id () {
    return this._id;
  }
  get name () {
    return this._name;
  }

  get price () {
    return this._price;
  }

  get quantity () {
    return this._quantity;
  }

  get productId () {
    return this._productID;
  }
  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  changePrice(price: number) {
    this._price = price;
  }

  validate() {
    if (this._quantity <= 0) {
      throw new Error("Quantity should to be greater than 0");
    }
  }
}