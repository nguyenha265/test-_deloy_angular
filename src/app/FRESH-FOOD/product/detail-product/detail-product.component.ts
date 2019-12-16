import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductServiceService} from '../../service/product/product-service.service';
import {Product} from '../../interface/product/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  sub: Subscription;
  product: Product;

  constructor(private productService: ProductServiceService, private activatedRoute: ActivatedRoute, private  router: Router) {
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
  bachToHome(){
    this.router.navigate(['listProduct']);
  }
}
