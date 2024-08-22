import { Injectable } from '@angular/core';
import { observable, computed, action } from 'mobx';
import { CartItems, ProductItems, CartItemDisplay } from '../../types';
import { ProductsService } from '../services/products.service';
import { environment } from '../../environments/environment';


@Injectable()
export class ProductsStore {
  constructor(private productsService: ProductsService) {
    this.productsService
    .getProducts(environment.apiUrl + '/products')
    .subscribe({
      next: (data: ProductItems) => {
        this.productItems = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  @observable productItems: ProductItems = {};
  @observable cartItems: CartItems = {};

  @computed get totalProductItems() {
    return Object.keys(this.productItems).length;
  }

  @computed get cartToDisplay() {
    const cartItemsDisplay: CartItemDisplay[] = [];
    let totalPrice = 0;
    for (const id in this.cartItems) {
      const product = this.productItems[id];
      if (product) {
        cartItemsDisplay.push({
          id,
          name: product.name,
          price: product.price,
          count: this.cartItems[id],
        });
        totalPrice += product.price * this.cartItems[id];
      }
    }
    return {cartItemsDisplay, totalPrice};
  }

  @action addToCart(productId: string, count: number) {
    if (count < 1) {
      console.error('Trying to add less than 1 product to cart');
      return;
    }
    if (this.cartItems[productId]) {
      this.cartItems[productId] += count;
    } else {
      this.cartItems[productId] = count;
    }
  }

  @action removeFromCart(productId: string) {
    if (!this.cartItems[productId]) {
      console.error('Trying to remove product that is not in cart');
      return;
    }
    this.cartItems[productId] -= 1;
    if (this.cartItems[productId] < 1) {
      delete this.cartItems[productId];
    }
  }
}
