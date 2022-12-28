import { isEntityName } from "typescript";
import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductService from "../../../domain/product/service/product-service";
import ProductModel from "./sequelize/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }
  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price
      }, 
      {
        where: {
          id: entity.id
        },
      }
    );

  }
  async find(id: string): Promise<Product> {
    let productModel;
    try {
      productModel = await ProductModel.findOne({ where: {id: id}});
      return new Product(productModel.id, productModel.name, productModel.price);
    } catch (error) {
      throw new Error("Product not found");
    }
    
  }
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    
    return productModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price));
  }

}