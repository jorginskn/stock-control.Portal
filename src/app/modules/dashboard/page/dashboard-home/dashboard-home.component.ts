import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/services/products/products-data-transfer.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  productList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private producstDtService: ProductsDataTransferService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productList = response;
          this.producstDtService.setProductsDatas(this.productList);
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500,
        });
      },
    });
  }
}
