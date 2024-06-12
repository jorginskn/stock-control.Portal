import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = enviroment.API_URL_CATALOG;
  private JWT_TOKEN = this.cookie.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http
      .get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`)
      .pipe(map((product) => product));
  }
}
