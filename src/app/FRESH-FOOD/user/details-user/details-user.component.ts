import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {User} from '../../interface/user/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  user: User = {name: '', username: '', password: ''};
  message = '';

  constructor(private  userService: UserService) {
  }

  ngOnInit() {
    this.userService.userDetails().subscribe(next => {
      this.user = next;
    }, error => {
      this.message = error;
    });
  }

}
