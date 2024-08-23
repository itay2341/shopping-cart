import { Component } from '@angular/core';
import { ProductsStore } from '../../store/products.store';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PricePipe } from '../../pipes/price.pipe';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ProductItemComponent, PricePipe, CommonModule, ButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
constructor(public productsStore: ProductsStore) {}

}
