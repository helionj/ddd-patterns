import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidactorFactory {

  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}