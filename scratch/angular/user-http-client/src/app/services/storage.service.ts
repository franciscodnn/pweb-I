import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private host = 'http://localhost:3000';
  private resource = 'users';

  private http = inject(HttpClient);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/${this.resource}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/${this.resource}`, user);
  }
}
