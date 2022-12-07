import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loader: boolean = false;
  cartProduct: any[]=[]
  base64:any = ''
  form! : FormGroup

  constructor(public productService: ProductsService , private fb :FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:['',[Validators.required]],
      price:['',[Validators.required]],
      description:['',[Validators.required]],
      image:['',[Validators.required]],
      category:['',[Validators.required]],
    })
    this.getProducts();
    this.getCategories();
  }

  getProducts(): any {
    this.loader = true;
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loader = false;
    });
  }
  getCategories() {
    this.loader = true;
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.loader = false;
    });
  }
  filterCategories(event: any) {
    let value = event.target.value;
    console.log(value);

    value === 'All' ? this.getProducts() : this.targetedCategories(value);
  }

  targetedCategories(keyword: any) {
    this.loader = true
    this.productService.getSpacificCategories(keyword).subscribe((res: any) => {
      this.loader = false
      this.products = res;
    });
  }
  addToCart(event : any){
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!)
      let exist = this.cartProduct.find(item=> item.item.id == event.item.id)
      if (exist) {
        confirm(`this product has added before`)
      } else {
        this.cartProduct.push(event)
        localStorage.setItem('cart',JSON.stringify(this.cartProduct))

      }

    } else {
      this.cartProduct.push(event)
      localStorage.setItem('cart',JSON.stringify(this.cartProduct))

    }

  }
  getSelectedCategory(event:any){
    this.form.get('category')?.setValue(event.target.value)
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
    this.base64 = reader.result;
    this.form.get('image')?.setValue( this.base64)

  }

}

addProduct(){
  const model = this.form.value
  this.productService.createProduct(model).subscribe(res=>{
    alert("the added ")
  })
  console.log(this.form)
}

// console.log(event)
// if ('cart' in localStorage) {
//   this.cartProduct= JSON.parse(localStorage.getItem('cart')!)
//   let exist = this.cartProduct.find(item=> item.id === event.id)
//   if (exist) {
//     alert('a7a')
//   }else{
//     this.cartProduct.push(event)
//   localStorage.setItem('cart' ,JSON.stringify(this.cartProduct))
//   }

// }else{
//   this.cartProduct.push(event)
//   localStorage.setItem('cart' ,JSON.stringify(this.cartProduct))
// }
}
