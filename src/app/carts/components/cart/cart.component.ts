import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  products:any[] = []
  total = 0
  form!: FormGroup
  details: any

  constructor( private cartService : CartService , private fb:FormBuilder , private productService : ProductsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      start:[''],
      end:['']
    })
    this.getAllCarts()
  }

  getAllCarts(){
    this.cartService.getAllCarts().subscribe(
      (res:any)=>{this.carts=res}
    )
  }
  applyFilter(){
    let date = this.form.value
    this.cartService.getAllCarts(date).subscribe(
      (res:any)=>{this.carts=res} ) }


      deleteCart(id:number){
        this.cartService.deleteCart(id).subscribe((res:any)=>{
          this.getAllCarts()
          alert('the cart has deleted ')
        })
      }

      

      view(index:number){
        this.products
        this.details = this.carts[index]
        for(let x in this.details.products){
          this.productService.getProductsById(this.details.products[x].productId).subscribe(
            res=>{
              this.products.push({item:res , quantity : this.details.products[x].quantity})
            }
          )


        }
        console.log(this.details)
      }
}
