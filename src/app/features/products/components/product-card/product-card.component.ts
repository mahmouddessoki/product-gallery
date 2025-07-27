import { CurrencyPipe } from '@angular/common';
import { Component, Input, output, OutputEmitterRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink,NgxStarsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: IProduct = {} as IProduct;
  addProdToCart:OutputEmitterRef<IProduct> = output<IProduct>()


  addToCart(){
    this.addProdToCart.emit(this.product);
  }



}
