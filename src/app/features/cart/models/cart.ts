import { IProduct } from "../../products/models/iproduct";

export interface CartProduct {
  product: IProduct;
  quantity: number;

}

export interface Cart {
  products: CartProduct[];
}
