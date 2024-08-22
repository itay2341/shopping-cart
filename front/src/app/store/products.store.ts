import { Injectable } from '@angular/core';
import { observable, computed, action } from 'mobx';
import { CartItems, ProductItems, CartItemDisplay } from '../../types';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsStore {
  constructor(private productsService: ProductsService) {
    this.productsService
    .getProducts('http://localhost:3000/products')
    .subscribe({
      next: (data: ProductItems) => {
        this.productsShop = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  @observable productsShop: ProductItems = {};
  @observable cartItems: CartItems = {totalPriceInCart: 0};

  @computed get productsIds() {
    return Object.keys(this.productsShop);
  }

  @computed get itemsInCartToDisplay() {
    const cartItemsDisplay: CartItemDisplay[] = [];
    for (const id in this.cartItems) {
      const product = this.productsShop[id];
      if (product) {
        cartItemsDisplay.push({
          id,
          name: product.name,
          price: product.price,
          count: this.cartItems[id],
        });
      }
    }
    return cartItemsDisplay;
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
    this.cartItems.totalPriceInCart += this.productsShop[productId].price * count;
  }

  @action removeFromCart(productId: string) {
    if (!this.cartItems[productId]) {
      console.error('Trying to remove product that is not in cart');
      return;
    }
    this.cartItems[productId] -= 1;
    this.cartItems.totalPriceInCart -= this.productsShop[productId].price;
    if (this.cartItems[productId] < 1) {
      delete this.cartItems[productId];
    }
  }
}
