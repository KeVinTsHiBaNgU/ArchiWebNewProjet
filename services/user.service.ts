import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../backend/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // Effectuez une requête HTTP GET pour récupérer les utilisateurs depuis votre backend
    // Assurez-vous d'ajuster l'URL en fonction de votre API
    return this.http.get<User[]>(`${this.apiUrl}users/admin/users`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/create`, userData);
  }
}
