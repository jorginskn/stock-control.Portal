import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/interfaces/enums/products/ProductEvent';
import { EventAction } from 'src/app/models/interfaces/event/eventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEventEmitter = new EventEmitter<EventAction>();
  public productSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;
  public deleteProductEvent = ProductEvent.SALE_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: number, name?: string): void {
      const productEventData: EventAction = { action, id: id ?? 0, name: name ?? '' };
      console.log(productEventData);
      this.productEvent.emit(productEventData);

  }

  handleDeleteProduct(action:string, id?: number, name?: string): void {
    if (id !== undefined) {
      const productEventData: EventAction = { action, id: id ?? 0, name: name ?? '' };
      console.log(productEventData);
      this.deleteProductEventEmitter.emit(productEventData);
    }
  }

}
