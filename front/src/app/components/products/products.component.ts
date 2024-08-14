import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { ProductsStore } from '../../store/products.store';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule, PricePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private productsService: ProductsService,
    private productsStore: ProductsStore
  ) {}

  fetchProducts() {
    this.productsService
      .getProducts('http://localhost:3000/products')
      .subscribe({
        next: (data: Product[]) => {
          data = data.map((product) => {
            return { ...product, amount: 0 };
          });
          if (this.productsStore.products.length === 0) {
            this.productsStore.products = data;
          }
          if (this.productsStore.cart.length === 0) {
            this.productsStore.cart = data;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    // if (localStorage.getItem('savedProducts')) {
    //   const data = JSON.parse(localStorage.getItem('savedProducts') || '');
    //   this.productsStore.products = data;
    //   if (localStorage.getItem('savedCart')) {
    //     const cart = JSON.parse(localStorage.getItem('savedCart') || '');
    //     this.productsStore.cart = cart;
    //   }
    //   else {
    //     this.productsStore.cart = data.map((product: Product) => {
    //       return { ...product, amount: 0 };
    //     });
    //   }
    //   return;
    // }
    // else {
    //   this.productsService
    //   .getProducts('http://localhost:3000/products')
    //   .subscribe({
    //     next: (data: Product[]) => {
    //       data = data.map((product) => {
    //         return { ...product, amount: 0 };
    //       });
    //       this.productsStore.products = data;
    //       this.productsStore.cart = data;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
    //   if (localStorage.getItem('savedCart')) {
    //     const cart = JSON.parse(localStorage.getItem('savedCart') || '');
    //     this.productsStore.cart = cart;
    //   }
    // }
  }

  getProducts() {
    return this.productsStore.products;
  }

  getTotal() {
    return this.productsStore.totalTemp;
  }

  addToCart() {
    this.productsStore.addToCart();
  }

  ngOnInit() {
    this.fetchProducts();
  }
}
