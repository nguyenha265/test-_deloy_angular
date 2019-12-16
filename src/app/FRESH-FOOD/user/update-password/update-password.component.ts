import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interface/user/user';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  user: User = {name: '', username: '', password: ''};
  message = true;
  updatePasswordForm: FormGroup;
  check = '';

  constructor(private fb: FormBuilder, private  userService: UserService, private cookieService: CookieService) {
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {
    this.updatePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.checkPasswords});
    this.userService.userDetails().subscribe(next => {
      this.user = next;
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    if (this.updatePasswordForm.valid && this.updatePasswordForm.get('password').value === window.sessionStorage.getItem('password')) {
      this.TransferFormDataToUser();
      this.userService.updatePasswordUser(this.user).subscribe(
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
        });
    } else {
      this.message = false;
    }
  }

  TransferFormDataToUser() {
      this.user = {
        id: this.user.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        password: this.updatePasswordForm.get('newPassword').value,
        role: ['user']
      };
  }
}
