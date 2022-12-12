import Customer from "../entity/Customer/customer";
import RepositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface 
    extends RepositoryInterface<Customer>{}