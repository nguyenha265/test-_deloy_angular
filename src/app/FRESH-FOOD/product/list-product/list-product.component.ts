import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../interface/product/product';
import {ProductServiceService} from '../../service/product/product-service.service';
import {UserService} from '../../service/user/user.service';
import {CookieService} from 'ngx-cookie-service';
import {OrderItem} from '../../interface/bill/orderItem';
import {Router} from '@angular/router';
import {UserBillService} from '../../service/bill/user-bill.service';
import {Category} from '../../interface/product/category';
import {CategoryService} from '../../service/Category/category.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  carts: Product[] = [];
  check = false;
  searchName = '';
  listCategory: Category[];


  constructor(private productService: ProductServiceService,
              private userService: UserService,
              private cookieService: CookieService,
              private  router: Router,
              private billService: UserBillService,
              private categoryService: CategoryService) {
  }

  ngOnDestroy() {
    window.localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  ngOnInit() {
    this.productService.listCategory().subscribe(next => {
      this.listCategory = next;
    }, error => {
      console.log(error);
    });
    this.check = false;
    this.carts = JSON.parse(window.localStorage.getItem('carts'));
    this.userService.userOnline.username = this.cookieService.get('username');
    this.userService.userOnline.accessToken = this.cookieService.get('jwtToken');
    this.productService.listProduct().subscribe(next => {
        this.products = next;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveCart(product) {
    this.carts.push(product);
    this.billService.index = this.carts.length;
    this.check = true;
  }

  searchByName(value) {
    this.searchName = value;
  }

  search() {
    this.productService.searchByName(this.searchName).subscribe(next => {
      this.products = next;
    }, error => {
      console.log(error);
    });
  }

  searchByCategory(id: number) {
    this.categoryService.findAllProductByIdCategory(id).subscribe(next => {
      this.products = next;
    }, error => {
      console.log(error);
    });
  }
}
