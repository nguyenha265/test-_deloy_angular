import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Product} from '../../interface/product/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL_CATEGORY = 'https://fresh-food-2510.herokuapp.com/category';
  private API_URL_PRODUCT = 'https://fresh-food-2510.herokuapp.com/product';


  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  createCategory(name: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.post(`${this.API_URL_CATEGORY}/add`, name, {headers});
  }

  findAllProductByIdCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL_PRODUCT}/getAllByCategory/${id}` );
  }
}
