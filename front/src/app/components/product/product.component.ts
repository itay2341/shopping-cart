import { Component, Directive, ElementRef, Input, signal, ViewChild, effect, Renderer2 } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { refStructEnhancer } from 'mobx/dist/internal';


@Component({
  selector: 'app-product',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [PricePipe, NamePipe, ButtonModule, TooltipModule, InputNumberModule, FormsModule, ToastModule, ConfirmPopupModule, DialogModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: ProductDetail;
  @Input() productId!: string;

  displayQuantityDialog = signal(false);
  count = 0;


  constructor(public productsStore: ProductsStore,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private elementRef: ElementRef,
              private renderer: Renderer2
  ) {
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      if (event.target.id.startsWith(this.productId)) {
        this.displayQuantityDialog.set(false);
        this.count = 0;
      }
    });
  }



  
  focusOut() {
    console.log('focus out');
    this.displayQuantityDialog.set(false);
    this.count = 0;
  }

  addToCart() {
    this.productsStore.addToCart(this.productId, this.count);
    this.count = 0;
  }

  accept() {
    this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Product added to the cart'});
    this.addToCart();
    this.confirmationService.close();
    this.displayQuantityDialog.set(false);
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

incrementQuantity() {
  this.count++;
}

decrementQuantity() {
  if (this.count > 1) {
    this.count--;
  }
}

cancelEditQuantity() {
    this.displayQuantityDialog.set(false);
    this.count = 0;
}
}



  // addToCart() {
  //   if (this.count <= 0) {
  //     this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please enter a valid quantity'});
  //     return;
  //   }
  //   this.productsStore.addToCart(this.productId, this.count);
  //   this.messageService.add({severity: 'success', summary: 'Added to Cart', detail: `${this.count} items of ${this.product.name} added to your cart.`});
  //   this.closeDialog();
  // }

