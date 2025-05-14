import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatCurrency(currency: number): string {
    return (currency / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
