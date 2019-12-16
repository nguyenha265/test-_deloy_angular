import {Component, OnInit} from '@angular/core';
import {User} from '../../interface/user/user';
import {UserService} from '../../service/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User = {name: '', username: '', password: ''};
  message = '';
  updateUserForm: FormGroup;
  check = '';

  constructor(private fb: FormBuilder, private  userService: UserService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.updateUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.userService.userDetails().subscribe(next => {
      this.user = next;
    }, error => {
      this.message = error;
    });
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      this.TransferFormDataToUser();
      this.userService.updateUser(this.user).subscribe(
        next => {
          this.userService.userOnline.username = '';
          this.userService.userOnline.accessToken = '';
          this.userService.userOnline.password = '';
          this.cookieService.delete('username');
          this.cookieService.delete('jwtToken');
          window.sessionStorage.removeItem('password');
          this.check = 'true';
        },
        error => {
          this.check = 'false';
        }
      );
    }
  }
  TransferFormDataToUser() {
    this.user = {
      id: this.user.id,
      name: this.updateUserForm.get('name').value,
      username: this.updateUserForm.get('username').value,
      email: this.updateUserForm.get('email').value,
      password: this.user.password,
      role: ['user']
    };
  }
}
