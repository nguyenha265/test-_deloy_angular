import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../interface/product/product';
import {ProductServiceService} from '../../service/product/product-service.service';

@Component({
  selector: 'app-delele-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  sub: Subscription;
  product: Product;
  check = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductServiceService,
              private  router: Router) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.productService.detailProduct(id).subscribe(next => {
        this.product = next;
      }, error => {
        console.log(error);
      });
    });
  }

  delete() {
    this.productService.deleteProduct(this.product.id).subscribe(next => {
      this.router.navigate(['productManagement/listProduct']);
    }, error => {
      this.check = true;
    });
  }
}
