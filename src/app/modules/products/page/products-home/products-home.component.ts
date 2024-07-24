import { Router } from '@angular/router';
import { ProductsDataTransferService } from './../../../../services/products/products-data-transfer.service';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventAction } from 'src/app/models/interfaces/event/eventAction';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public productList: Array<GetAllProductsResponse> = [];
  constructor(
    private productService: ProductsService,
    private productDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productDtService.getProductsDatas();
    if (productsLoaded.length > 0) {
      this.productList = productsLoaded;
    } else {
      this.GetProducts();
    }
  }

  GetProducts() {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao buscar produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }


  deleteProduct(productId?: number) {
    if (productId !== undefined) {
      this.productService
        .deleteProduct(productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto excluído com sucesso',
                life: 2500,
              });
              this.GetProducts();
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao remover produto',
              life: 2500,
            });
          },
        });
    }
  }

  handleProductAction(event: EventAction): void {
    console.log('Dados do evento recebido', event);
  }

  handleDeleteProductAction(event: EventAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto ${event.name}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.deleteProduct(event.id);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
