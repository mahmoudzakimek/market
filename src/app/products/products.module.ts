import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    declarations: [
        AllProductsComponent,
        ProductsDetailsComponent,
        ProductComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: AllProductsComponent
            }
        ]),
        SharedModule

    ]
})
export class ProductsModule { }
