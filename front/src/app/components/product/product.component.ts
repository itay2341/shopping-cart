import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../../types';
import { PricePipe } from '../../pipes/price.pipe';
import { NamePipe } from '../../pipes/name.pipe';
import { ButtonModule } from 'primeng/button';
import { ProductsStore } from '../../store/products.store';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PricePipe, NamePipe, ButtonModule, TooltipModule, InputNumberModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(public productsStore: ProductsStore) {}
  @Input() product!: ProductDetail;
  @Input() productId!: string;
  count = 0;

  addToCart() {
    this.productsStore.addToCart(this.productId, this.count);
    this.count = 0;
  }
}
