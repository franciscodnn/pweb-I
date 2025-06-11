import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private httpClient = inject(HttpClient);
  private host = 'http://localhost:3000';

  constructor() { }

  getAllUsers(resource: string) {
    // http://localhost:3000/users
    return this.httpClient.get(
      `${this.host}/${resource}`
    );
  }
}
