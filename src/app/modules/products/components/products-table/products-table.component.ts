import { Component, Input } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  public productSelected!: GetAllProductsResponse;
}
