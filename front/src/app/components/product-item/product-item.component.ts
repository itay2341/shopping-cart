import { Component, Input } from '@angular/core';
import { NamePipe } from '../../pipes/name.pipe';
import { ProductsStore } from '../../store/products.store';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { CartItemDisplay } from '../../../types';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NamePipe, ButtonModule, CommonModule, TooltipModule, PricePipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  constructor(public productsStore :ProductsStore) {}
  @Input() product!: CartItemDisplay;
}
