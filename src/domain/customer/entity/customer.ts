import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidactorFactory from "../factory/customer.validactor.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{

  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number= 0;

  constructor(id: string, name:string, ){
    super()
    this._id = id
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
    CustomerValidactorFactory.create().validate(this);
    if (this.notification.hasErrors()){
      throw new NotificationError(this.notification.errors)
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
  public get address() {
    return this._address
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