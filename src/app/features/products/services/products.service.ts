import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './../../../../environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get(env.BASE_URL+'products')
  }

  getProductById(id:number):Observable<any> {
    return this.http.get(env.BASE_URL+'products/'+id)
  }
}
