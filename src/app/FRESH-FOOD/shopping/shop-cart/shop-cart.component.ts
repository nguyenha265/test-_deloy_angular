import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductServiceService} from '../../service/product/product-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserBillService} from '../../service/bill/user-bill.service';
import {Subscription} from 'rxjs';
import {Product} from '../../interface/product/product';
import {OrderItem} from '../../interface/bill/orderItem';
import {Order} from '../../interface/bill/order';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  carts: Product[] = [];
  totalCart = 0;
  buy: number;
  bill: Order = {orderItem: []};
  listProduct: OrderItem;
  check: string;

  constructor(private productService: ProductServiceService,
              private activatedRoute: ActivatedRoute,
              private  router: Router,
              private  userBillService: UserBillService) {
  }

  ngOnDestroy() {
    window.localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  ngOnInit() {
    this.carts = JSON.parse(window.localStorage.getItem('carts'));
    for (const product of this.carts) {
      this.totalCart += product.price;
      product.amount = 1;
      product.total = product.price;
    }
    this.buy = this.totalCart;
  }

  delete(value) {
    this.totalCart = 0;
    this.carts.splice(value, 1);
    for (const product1 of this.carts) {
      this.totalCart += product1.total;
    }
    this.buy = this.totalCart;
  }

  backToHome() {
    this.router.navigate(['listProduct']);
  }

  total(value: number, product: Product) {
    this.totalCart = 0;
    product.amount = value;
    product.total = product.price * value;
    for (const product1 of this.carts) {
      this.totalCart += product1.total;
    }
    this.buy = this.totalCart;
  }

  payAll() {
    for (const product of this.carts) {
      this.listProduct = {productId: product.id, quantity: product.amount};
      this.bill.orderItem.push(this.listProduct);
    }
    this.userBillService.saveBill(this.bill).subscribe(next => {
      this.check = 'true';
      this.carts.splice(0);
      window.localStorage.removeItem('carts');
    }, error => {
      this.router.navigate(['login']);
    });
  }
}
