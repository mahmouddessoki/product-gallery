import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,NgxStarsModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private readonly router = inject(ActivatedRoute)
  private readonly productService = inject(ProductsService)
  id!: number;
  product: IProduct = {} as IProduct;
  ngOnInit(): void {
    this.getProductId()
  }
  getProductId() {
    this.router.paramMap.subscribe({
      next: (res) => {
        this.id = +res.get('id')!;
        this.getProductDetails();
      }
    })
  }

  getProductDetails() {
    this.productService.getProductById(this.id).subscribe({
      next: (product) => {
        this.product = product
      }
    })
  }


}
