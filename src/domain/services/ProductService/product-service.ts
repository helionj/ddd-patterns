import Product from "../../entity/Product/product";

export default class ProductService {

  static increasePrice(products: Product[], percentage: number): void {
   for ( let product of products ){
      product.changePrice(product.price + product.price*(percentage/100))
   }

  }
}