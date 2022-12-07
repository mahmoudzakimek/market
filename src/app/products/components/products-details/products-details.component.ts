import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  loader: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductById();
    // console.log(this.id)
  }

  getProductById() {
    this.loader = true;
    return this.productService.getProductsById(this.id).subscribe((res) => {
      this.loader = false;
      this.data = res;
    });
  }
}
