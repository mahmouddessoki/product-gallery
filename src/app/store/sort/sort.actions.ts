import { createAction, props } from "@ngrx/store";
import { sortType } from "./sort.states";
//Interfaces
import { IProduct } from "../../features/products/models/iproduct";

//load products
export const loadProducts = createAction("[sort] loadProducts", props<{ products: IProduct[] }>());

//sortByPrice
export const sortByPrice = createAction("[sort] sortByPrice", props<{ sType: sortType }>());
//sortByName
export const sortByTitle = createAction("[sort] sortByTitle", props<{ sType: sortType }>());

//sortProducts
export const sortProducts = createAction("[sort] sortProducts");

//getFilteredProducts

//clear Sort
export const clearSort = createAction("[sort] clearSort");
