import { CreateProductRequest } from './../../../../models/interfaces/products/request/CreateProductRequest';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public categoryList: Array<GetCategoriesResponse> = [];
  public selectedCategory: Array<{name: string; id: number}> = []

  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    stock: [0, Validators.required],
  });

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.categoryList = response;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleSubmitAddProduct() {
        if(this.addProductForm?.value && this.addProductForm?.valid){
             const requestCreateProduct:  CreateProductRequest = {
               name: '',
               description: '',
               price: '',
               categoryId: 0,
               stock: 0
             }
        }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
