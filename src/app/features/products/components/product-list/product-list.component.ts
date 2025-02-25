import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';
import { ProductCardComponent } from "../product-card/product-card.component";
import {FormsModule} from "@angular/forms"
@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products:IProduct[]=[]
  searchWord:string=""
  constructor(private productService:ProductsService){}
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.productService.getProducts().subscribe({
      next:(res)=>{
        this.products=res
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  get FilteredProducts(){
    if(this.searchWord.trim()==""){
      return this.products
    }
    return this.products.filter((p)=>{
      return p.title.toLowerCase().includes(this.searchWord)
    })
  }

}
