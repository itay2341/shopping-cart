import { Component, Input } from '@angular/core';
import { Product } from '../../../types';
import { NamePipe } from '../../pipes/name.pipe';
import { ProductsStore } from '../../store/products.store';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NamePipe, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  constructor(private productsStore :ProductsStore) {}
  @Input() product!: Product;

  removeProduct(id: number) {
    this.productsStore.removeFromCart(id);
  }
}
