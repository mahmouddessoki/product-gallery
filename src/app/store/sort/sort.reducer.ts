import { createReducer, on } from "@ngrx/store";
import { sortConditions, sortState, sortType } from "./sort.states";
import * as sortActions from "./sort.actions";
// Interfaces
// Enums
import { IProduct } from "../../features/products/models/iproduct";
import { sortTypes } from "../../features/products/enums/sort.enum";

export function sortProducts(products: IProduct[], field: string, order: "asc" | "desc"): IProduct[] {
  return [...products].sort((a, b) => {
    const valueA = field === "price" ? a.price : a.title.toLowerCase();
    const valueB = field === "price" ? b.price : b.title.toLowerCase();

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

const sortInitialState: sortState = {
  products: [],
  sortedProducts: [],
  sortedConditions: {} as sortConditions,
};

export const sortReducer = createReducer(
  sortInitialState,
  on(sortActions.loadProducts, (state, { products }) => {
    return {
      ...state,
      products: products,
      sortedProducts: products,
    };
  }),

  on(sortActions.sortByTitle, (state, { sType }) => {
    return {
      ...state,
      sortedConditions: {
        type: sType,
        sortBy: "title",
      },
    };
  }),
  on(sortActions.sortByPrice, (state, { sType }) => {
    return {
      ...state,
      sortedConditions: {
        type: sType,
        sortBy: "price",
      },
    };
  }),
  on(sortActions.sortProducts, (state) => {
    const newState = {
      ...state,
    };
    const sortType = state.sortedConditions.type;
    const sortField = state.sortedConditions.sortBy;

    switch (sortType) {
      case sortTypes.ASC:
        if (sortField === "title") {
          newState.sortedProducts = sortProducts(newState.products, "title", "asc");
        } else {
          newState.sortedProducts = sortProducts(newState.products, "price", "asc");
        }

        break;
      case sortTypes.DESC:
        if (sortField === "title") {
          newState.sortedProducts = sortProducts(newState.products, "title", "desc");
        } else {
          newState.sortedProducts = sortProducts(newState.products, "price", "desc");
        }
    }

    return newState;
  }),
  on(sortActions.clearSort,(state)=>{
   return {
    ...state,
    sortedProducts:state.products
  }
  })
);
