import { Component, OnInit } from '@angular/core';
import {Product} from '../../interface/product/product';
import {ProductServiceService} from '../../service/product/product-service.service';

@Component({
  selector: 'app-mamagement-list-product',
  templateUrl: './management-list-product.component.html',
  styleUrls: ['./management-list-product.component.css']
})
export class ManagementListProductComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductServiceService) {
  }

  ngOnInit() {
    this.productService.listProduct().subscribe(next => {
        this.products = next;
      },
      error => {
        console.log(error);
      }
    );
  }
}
