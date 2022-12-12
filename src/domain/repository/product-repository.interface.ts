import Product from "../entity/Product/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductRepositoryInterface 
    extends RepositoryInterface<Product>{}