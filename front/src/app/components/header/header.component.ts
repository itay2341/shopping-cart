import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductsStore } from '../../store/products.store';
import { SidebarModule } from 'primeng/sidebar';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, SidebarModule, ShoppingCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public productStore: ProductsStore) {}
  cartVisible: boolean = false;
}
