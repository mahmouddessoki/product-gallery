import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { CartService } from './services/cart.service';
import { EmptyCartComponent } from "./components/empty-cart/empty-cart.component";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, CartItemComponent, EmptyCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private _cartService  = inject(CartService);
  cartProducts = computed(()=>this._cartService.cartProducts())
  cartTotal = computed(()=>this._cartService.cartTotal())







  //hooks

  ngOnInit(): void {
  }



}
