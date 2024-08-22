import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ProductItems } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) {}
  
  getProducts = (url: string): Observable<ProductItems> => {
    return this.apiService.get(url);
  };
}
