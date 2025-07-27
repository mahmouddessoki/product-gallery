import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  item = input.required<CartProduct>()
    private _toaster  = inject(ToastrService);
    private _cartService  = inject(CartService);



  updateQty(id:number,amount:number){
    const isUpdated = this._cartService.updateProductQty(id,amount)
    this.operationAlert(isUpdated , "Quantity Updated")
  }

  removeItem(id:number){
    const isRemoved = this._cartService.removeItem(id)
    this.operationAlert(isRemoved,"Remove")

  }

  operationAlert(res : boolean,type:string) {
    if(res){
      this._toaster.success(`${type} successfully`)

    }else {
      this._toaster.error(`${type}' failed'`)
    }
  }
}
