import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { FallbackUIComponent } from '@fallback/fallback-ui.component';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, NgxStarsModule, RouterLink,FallbackUIComponent],
templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  private readonly router = inject(ActivatedRoute)
  private readonly productService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toaster = inject(ToastrService);
  errorMsg:string= ''
  id!: number;
  product: IProduct = {} as IProduct;
  subscription = new Subscription()

  getProductId() {
    this.router.paramMap.subscribe({
      next: (res) => {
        this.id = +(res.get('id'))!;
        this.getProductDetails();
      }
    })
  }

  getProductDetails() {
    this.subscription = this.productService.getProductById(this.id).subscribe({
      next: (product) => {
        this.product = product
      },
      error:()=>{
        this.errorMsg = "Error While Fetching Product Details ..."
      }
    })
  }
  addToCart(){
    const added = this.cartService.addToCart(this.product)
    if(added){
      this.toaster.success('Product Added to Cart')
    }else {
       this.toaster.info('Already Added to Cart Qty Increased')
    }
  }
  //hooks
   ngOnInit(): void {
    this.getProductId()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
