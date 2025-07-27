import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../products/models/iproduct';
import { Cart, CartProduct } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _platform_id = inject(PLATFORM_ID)
  private storage_key = "userCart"
  cartQty = signal(0);
  cartTotal = signal(0)
  cartProducts: WritableSignal<CartProduct[]>= signal([])
  constructor() {
    if (isPlatformBrowser(this._platform_id)) {
      this.getCartItems()
    }
   }

  addToCart(product:IProduct):boolean{
    if(!isPlatformBrowser(this._platform_id)) return false;
    let userCart:Cart | null = JSON.parse(localStorage.getItem(this.storage_key)!);


    if(userCart == null) {
      userCart = {
        products: []
      };

      const productToAdd: CartProduct = {
        product,
        quantity:1
      };


      userCart.products.push(productToAdd);
      localStorage.setItem(this.storage_key, JSON.stringify(userCart));
    }else {
        let isExist = userCart.products.findIndex((p:CartProduct)=>{
          return p.product.id == product.id
        })
        if (isExist != -1) {
          this.updateQty(isExist , userCart)
        }else {
           const productToAdd: CartProduct = {
            product,
            quantity: 1,
           }
         this.pushNewProduct(productToAdd,userCart)
        }
      }
       this.cartQty.set(userCart.products.length)
       this.cartProducts.set(userCart.products)
       this.cartTotal.set(this.getCartTotal())
      return true
  }

  pushNewProduct(product:CartProduct,cart:Cart){
     cart.products.push(product);
    localStorage.setItem(this.storage_key, JSON.stringify(cart));
  }
  updateQty(prodIdx:number , cart:Cart) {
          cart.products[prodIdx].quantity += 1
          localStorage.setItem(this.storage_key, JSON.stringify(cart));
  }


  getCartItems() {
    if(!isPlatformBrowser(this._platform_id)) return;
    let userCart:Cart | null = JSON.parse(localStorage.getItem(this.storage_key)!);
    if(userCart == null) {
      this.cartProducts.set([])
      this.cartQty.set(0)

    }else {
      this.cartProducts.set(userCart.products)
      this.cartQty.set(userCart.products.length)
      this.cartTotal.set(this.getCartTotal())
    }
  }

  getCartTotal():number{
    let total = 0;
    this.cartProducts().forEach((item:CartProduct) => {
      total += item.product.price * item.quantity
    })
    return total
  }

  removeItem(prodId:number):boolean {
    if(!isPlatformBrowser(this._platform_id)) return false;
    let userCart:Cart | null = JSON.parse(localStorage.getItem(this.storage_key)!);
    const newProds:CartProduct[] = userCart?.products.filter((p:CartProduct)=>{
      return p.product.id != prodId
    })!
    userCart!.products = newProds
    localStorage.setItem(this.storage_key, JSON.stringify(userCart));
    this.cartQty.set(newProds!.length ?? 0)
    this.cartProducts.set(newProds ?? [])
    this.cartTotal.set(this.getCartTotal())

    return true

  }

  updateProductQty(prodId:number,newQty:number):boolean {
    if(!isPlatformBrowser(this._platform_id)) return false;
    let userCart:Cart | null = JSON.parse(localStorage.getItem(this.storage_key)!);
    let prodIdx = userCart!.products.findIndex((p:CartProduct)=>{
      return p.product.id == prodId
    })
    if(prodIdx != -1) {
      userCart!.products[prodIdx].quantity += newQty
      if( userCart!.products[prodIdx].quantity == 0) {
        userCart!.products.splice(prodIdx,1)

      }
    }
    localStorage.setItem(this.storage_key, JSON.stringify(userCart));
    this.cartProducts.set(userCart?.products ?? [])
    this.cartQty.set(userCart?.products.length ?? 0)
    this.cartTotal.set(this.getCartTotal())

    return true
  }


}
