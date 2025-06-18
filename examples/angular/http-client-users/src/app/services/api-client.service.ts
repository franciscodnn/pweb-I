import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private httpClient = inject(HttpClient);
  private host = 'http://localhost:3000';

  constructor() { }

  getAllUsers(resource: string) {
    // http://localhost:3000/users
    const endpoint = `${this.host}/${resource}`;
    return this.httpClient.get<User[]>(
      endpoint
    );
  }

  createUser(user: User, resource: string) {
    const endpoint = `${this.host}/${resource}`;
    this.httpClient.post<User>(
      endpoint,
      user
    ).subscribe();
  }

  getUserById(id: string, resource: string) {
    return this.httpClient.get<User>(
      `${this.host}/${resource}/${id}`
    );
  }
}
