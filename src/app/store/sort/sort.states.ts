// Interface
import { IProduct } from "../../features/products/models/iproduct";

export type sortType = "asc" | "desc";

export interface sortConditions {
  sortBy: string;
  type: sortType;
}

export interface sortState {
  products: IProduct[];
  sortedProducts: IProduct[];
  sortedConditions: sortConditions;
}
