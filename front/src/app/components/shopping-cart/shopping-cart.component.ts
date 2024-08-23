import { Component } from '@angular/core';
import { ProductsStore } from '../../store/products.store';
import { PricePipe } from '../../pipes/price.pipe';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [PricePipe, CommonModule, ButtonModule, ProductItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
constructor(public productsStore: ProductsStore) {}
}
