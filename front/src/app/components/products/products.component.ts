import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule, KeyValuePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productsStore: ProductsStore) {}
}
