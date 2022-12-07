import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';

const routes: Routes = [
  {path:'products',loadChildren:()=> import("./products/products.module").then(m=> m.ProductsModule)},
  {path:'details/:id',component:ProductsDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'**',component:AllProductsComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
