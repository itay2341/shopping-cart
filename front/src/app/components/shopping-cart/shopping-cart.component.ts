import { Component } from '@angular/core';
import { ProductsStore } from '../../store/products.store';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PricePipe } from '../../pipes/price.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ProductItemComponent, PricePipe, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
constructor(private productsStore: ProductsStore) {}

  getTotalCart() {
    return this.productsStore.totalCart;
  }

  getCart() {
    return this.productsStore.cart.filter(product =>  product.amount > 0);
  }
}
