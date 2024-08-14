import { Injectable } from '@angular/core';
import { observable, autorun, computed, action, makeObservable } from 'mobx';
import { Product } from '../../types';

@Injectable()
export class ProductsStore {
  constructor() {
    makeObservable(this);
    if (localStorage['savedProducts']) {
      this.products = JSON.parse(localStorage['savedProducts']);
    }
    if (localStorage['savedCart']) {
      this.cart = JSON.parse(localStorage['savedCart']);
    }
    autorun(() => {
      localStorage['savedProducts'] = JSON.stringify(this.products);
      localStorage['savedCart'] = JSON.stringify(this.cart);
    });
  }

  @observable products: Product[] = [];
  @observable cart: Product[] = [];

  @computed get totalTemp() {
    return this.products.map((product) => product.amount * product.price).reduce((a, b) => a + b, 0);
  }
  @computed get totalCart() {
    return this.cart.map((product) => product.amount * product.price).reduce((a, b) => a + b, 0);
  }

  @action increment(id: number) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, amount: product.amount ? product.amount + 1 : 1 };
      }
      return product;
    });
  }
  
  @action decrement(id: number) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, amount: product.amount ? product.amount - 1 : 0 };
      }
      return product;
    });
  }

  @action addToCart() {
    let addedProducts = this.products.filter((product) => product.amount > 0);
    for (let i = 0; i < addedProducts.length; i++) {
      let product = addedProducts[i];
      this.cart = this.cart.map((selectedProduct) => {
        if (selectedProduct.id === product.id) {
          return { ...selectedProduct, amount: selectedProduct.amount + product.amount };
        }
        return selectedProduct;
      });
    }

    this.products = this.products.map((product) => {
      if (product.amount > 0) {
        return { ...product, amount: 0 };
      }
      return product;
    });
  }

  @action removeFromCart(id: number) {
    this.cart = this.cart.map((product) => {
      if (product.id === id) {
        return { ...product, amount: product.amount - 1 };
      }
      return product;
    });
  }
}
