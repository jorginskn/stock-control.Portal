import { GetAllProductsResponse } from './../../models/interfaces/products/request/GetAllProductsResponse';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  productsDataEmitter$ =
    new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  productsDatas: Array<GetAllProductsResponse> = [];
  constructor() {}

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.Stock > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        },
      });
    return this.productsDatas;
  }
}
