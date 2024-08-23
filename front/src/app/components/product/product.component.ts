import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../../types';
import { PricePipe } from '../../pipes/price.pipe';
import { NamePipe } from '../../pipes/name.pipe';
import { ButtonModule } from 'primeng/button';
import { ProductsStore } from '../../store/products.store';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [PricePipe, NamePipe, ButtonModule, TooltipModule, InputNumberModule, FormsModule, ToastModule, ConfirmPopupModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(public productsStore: ProductsStore,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) {}
  @Input() product!: ProductDetail;
  @Input() productId!: string;
  count = 0;

  addToCart() {
    this.productsStore.addToCart(this.productId, this.count);
    this.count = 0;
  }

  accept() {
    this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Product added to the cart'});
    this.addToCart();
    this.confirmationService.close();
  }

  reject() {
    this.confirmationService.close();
  }

  confirm(event: Event) {
    if (this.count === 0) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please enter a quantity'});
      return;
    }
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to add this product to the cart?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accept();
      },
      reject: () => {
        this.reject();
      }
    });
    
  }

}
