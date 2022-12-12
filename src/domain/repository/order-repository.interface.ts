import Order from "../entity/Order/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface 
    extends RepositoryInterface<Order>{}