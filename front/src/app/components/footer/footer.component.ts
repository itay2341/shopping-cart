import { Component } from '@angular/core';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public productsStore: ProductsStore) {}
}
