import { Component } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProductComponent } from '../product/product.component';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ShoppingCartComponent, ProductComponent, CommonModule, KeyValuePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public productStore: ProductsStore) {}
}
