import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient , private route : ActivatedRoute) { }

  // New Comment1
  getAllProducts(){
    return this.http.get( environment.basApi + 'products')
  }
  getCategories(){
    return this.http.get(environment.basApi + 'products/categories')
  }

  getSpacificCategories(keyword: any){
    return this.http.get(environment.basApi + 'products/category/'+`${keyword}`)
  }
  getProductsById(id : any ){
    return this.http.get(environment.basApi + 'products/'+id)
  }
  createProduct(model :any){
    return this.http.post(environment.basApi + 'products ', model)
  }
}
