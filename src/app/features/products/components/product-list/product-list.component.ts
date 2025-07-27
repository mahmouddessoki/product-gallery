import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as sortActions from "@sort/sort.actions";
import * as sortSelectors from "@sort/store.selectors";
import { IProduct } from '../../models/iproduct';
import { SearchPipe } from '../../pipes/search.pipe';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { SortOptionsComponent } from "../sort-options/sort-options.component";
import { FallbackUIComponent } from "@fallback/fallback-ui.component";
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, FormsModule, SortOptionsComponent, SearchPipe, FallbackUIComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit , OnDestroy {

  products:IProduct[] = []
  searchWord:string=""
  errorMsg:string = ''
  subscription = new Subscription()
  private _productService = inject(ProductsService)
  private _store = inject(Store)
  private _cartService = inject(CartService)
  private _toaster = inject(ToastrService)

  constructor(){}

  getProducts(){
    this._productService.getProducts().subscribe({
      next:(res)=>{
        this._store.dispatch(sortActions.loadProducts({
          products:res
        }))
      },
      error:()=>{
        this.errorMsg = "Error Occurred while Fetching Products.... "
      }
    })
  }





  addToCart(product:IProduct){
   const isAdded =  this._cartService.addToCart(product)
   if(isAdded){
    this._toaster.success("Product Added to Cart")
   }else {
    this._toaster.info("Already in Cart Qty Increased")
   }
  }



    ngOnInit(): void {
      this.getProducts()
      this.subscription = this._store.select(sortSelectors.sortStateSelector).subscribe({
        next: (res) => {
          this.products = res.sortedProducts
        }
      })
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
  }



