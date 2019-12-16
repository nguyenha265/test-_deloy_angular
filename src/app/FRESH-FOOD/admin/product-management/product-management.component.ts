import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../service/product/product-service.service';
import {Product} from '../../interface/product/product';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  constructor(private  router: Router, private userService: UserService, private cookieService: CookieService) {
  }
  ngOnInit() {
    this.userService.userOnline.username = this.cookieService.get('username');
    this.userService.userOnline.accessToken = this.cookieService.get('jwtToken');
    this.router.navigate(['productManagement/listProduct']);
  }

}
