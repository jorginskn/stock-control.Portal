import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = enviroment.API_URL_CATALOG;
  private JWT_TOKEN = this.cookie.get('USER_INFO');

  constructor(private http: HttpClient, private cookie: CookieService) {}




  getAllCategories():Observable<Array<GetCategoriesResponse>>{
    return this.http.get<Array<GetCategoriesResponse>>(`${this.API_URL}/Categories`)
  }
}
