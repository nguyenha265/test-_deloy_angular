import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../interface/product/product';
import {CookieService} from 'ngx-cookie-service';
import {Category} from '../../interface/product/category';
import {Provider} from '../../interface/product/provider';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private API_URL_PRODUCT = 'https://fresh-food-2510.herokuapp.com/product';
  private API_URL_CATEGORY = 'https://fresh-food-2510.herokuapp.com/category';
  private API_URL_PROVIDER = 'https://fresh-food-2510.herokuapp.com/provider';


  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  listProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL_PRODUCT}/home`);
  }

  listCategory(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.get<Category[]>(`${this.API_URL_CATEGORY}/list`, {headers});
  }

  listProvider(): Observable<Provider[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.get<Provider[]>(`${this.API_URL_PROVIDER}/list`, {headers});
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.post<Product>(`${this.API_URL_PRODUCT}/add`, product, {headers});
  }

  detailProduct(id: string): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.get<Product>(`${this.API_URL_PRODUCT}/${id}`, {headers});
  }

  deleteProduct(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('jwtToken')
    });
    return this.http.delete<void>(`${this.API_URL_PRODUCT}/delete/${id}`, {headers});
  }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL_PRODUCT}/findAllByName?name=${name}`);
  }


}


