import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
checkRole: string;
  constructor(private userService: UserService, private  router: Router) { }

  ngOnInit() {
  this.checkRole = this.userService.userOnline.username;
  }
  listProduct(){
    this.router.navigate(['productManagement/listProduct']);
  }
  listOrder(){
    this.router.navigate(['listOrder']);
  }
}
