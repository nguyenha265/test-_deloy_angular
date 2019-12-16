import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from '../../interface/product/product';
import {ProductServiceService} from '../../service/product/product-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserBillService} from '../../service/bill/user-bill.service';
import {OrderItem} from '../../interface/bill/orderItem';
import {Order} from '../../interface/bill/order';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {
  sub: Subscription;
  product: Product;
  quantity = 1;
  total: number;
  orderItem: OrderItem;
  order: Order = {orderItem: []};
  check: string;

  constructor(private productService: ProductServiceService,
              private activatedRoute: ActivatedRoute,
              private  router: Router,
              private  userBillService: UserBillService) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.productService.detailProduct(id).subscribe(next => {
        this.product = next;
        this.totalMoney(this.quantity);
      }, error => {
        console.log(error);
      });
    });
  }

  createOdrder() {
    this.orderItem = {productId: this.product.id, quantity: this.quantity};
    this.order.orderItem.push(this.orderItem);
  }

  totalMoney(value) {
    if (value > 0) {
      this.quantity = value;
      this.total = value * this.product.price;
    } else {
      this.quantity = 0;
      this.total = 0;
    }
  }


  pay() {
    this.createOdrder();
    this.userBillService.saveBill(this.order).subscribe(next => {
      this.check = 'true';
    }, error => {
      this.router.navigate(['login']);
    });
  }

  bachToHome() {
    this.router.navigate(['listProduct']);
  }
}
