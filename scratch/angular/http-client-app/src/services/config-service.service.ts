import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../app/data/users';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  private http = inject(HttpClient);
  host = 'http://localhost:3000';

  loadData(resource: string) {
    return this.http.get(`${this.host}/${resource}`);
  }

  add(resource: string, data: any) {
    return this.http.post(`${this.host}/${resource}`, data);
  }

  remove(resource: string, id: number) {
    return this.http.delete(`${this.host}/${resource}/${id}`);
  }

  constructor() { }
}
