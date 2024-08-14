import { Component, Input } from '@angular/core';
import { Product } from '../../../types';
import { PricePipe } from '../../pipes/price.pipe';
import { NamePipe } from '../../pipes/name.pipe';
import { ButtonModule } from 'primeng/button';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PricePipe, NamePipe, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private productsStore: ProductsStore) {}
  @Input() product!: Product;

  addProduct(id: number) {
    this.productsStore.increment(id);
  }

  removeProduct(id: number) {
    this.productsStore.decrement(id);
  }
}
