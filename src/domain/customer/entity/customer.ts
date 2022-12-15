import Address from "../value-object/address";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number= 0;

  constructor(id: string, name:string, ){
    this._id=id;
    this._name=name;
    this.validate()
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  activate() {
    if (this._address === undefined) {
      throw Error("Address is mandactory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  increaseRewards(points: number) {
    this._rewardPoints += points;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  public set Address(address: Address) {
    this._address = address;
  }

  public set active(status: boolean) {
    this._active = status;
  }

  public set rewardPoints(points: number) {
    this._rewardPoints = points;
  }
  public get Address() {
    return this._address
  }
 
  public get id() {
    return this._id;
  }


  public get name() {
    return this._name;
  }

  public get active() {
    return this._active;
  }

  public get rewardPoints() {
    return this._rewardPoints
  }
  
}