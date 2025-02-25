import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { NgxStarsModule } from 'ngx-stars';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink,NgxStarsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: IProduct = {} as IProduct;

  // @ViewChild(NgxStarsComponent)
  // starsComponent!: NgxStarsComponent;
  // heartIcons = {
  //   empty: '../assets/heart-empty.svg',
  //   half: '../assets/heart-half.svg',
  //   full: '../assets/heart-full.svg',
  // }


  // when you want to update the stars in code
  // this.starsComponent.setRating(0);



}
