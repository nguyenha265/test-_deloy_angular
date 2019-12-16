import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../interface/user/user';
import {UserOnline} from '../../interface/user/user-online';
import {Login} from '../../interface/user/login';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userOnline: UserOnline = {username: '', accessToken: ''};
  private API_URL = 'https://fresh-food-2510.herokuapp.com/api/auth';
  check = '';

  constructor(private http: HttpClient, private cookieService: CookieService, private  router: Router) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signup`, user);
  }

  userLogin(userLogin: Login): Observable<UserOnline> {
    return this.http.post<UserOnline>(`${this.API_URL}/signin`, userLogin);
  }

  userDetails(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.get<User>(`${this.API_URL}/view/user/${this.userOnline.username}`, {headers});
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.put<User>(`${this.API_URL}/update/user`, user, {headers});
  }

  updatePasswordUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.put<User>(`${this.API_URL}/update/password/user`, user, {headers});
  }

  autoLogin(login: Login) {
    this.userLogin(login).subscribe(next => {
        for (const role of next.authorities) {
          if (role.authority === 'ROLE_ADMIN') {
            this.cookieService.set('username', 'Admin');
            this.cookieService.set('jwtToken', next.accessToken);
            window.sessionStorage.setItem('role', role.authority);
            this.router.navigate(['productManagement']);
            break;
          } else if (role.authority === 'ROLE_USER') {
            this.cookieService.set('username', next.username);
            this.cookieService.set('jwtToken', next.accessToken);
            window.sessionStorage.setItem('role', role.authority);
            this.router.navigate(['listProduct']);
          }
        }
        this.check = 'true';
      },
      error => {
        this.cookieService.delete('username');
        this.cookieService.delete('jwtToken');
        this.check = 'false';
      });
  }
}
