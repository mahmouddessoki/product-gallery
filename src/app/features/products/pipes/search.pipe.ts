import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[],searchWord:string): IProduct[] {
    if (!products) return [];
    return products.filter((product)=>{
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    })
  }

}
