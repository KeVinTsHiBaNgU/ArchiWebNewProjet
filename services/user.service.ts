import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../backend/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // Effectuez une requête HTTP GET pour récupérer les utilisateurs depuis votre backend
    // Assurez-vous d'ajuster l'URL en fonction de votre API
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/all');
  }
  
  getUser(userId: string): Observable<User[]> {
    // Effectuez une requête HTTP GET pour récupérer les utilisateurs depuis votre backend
    // Assurez-vous d'ajuster l'URL en fonction de votre API
    return this.http.get<User[]>(`${this.apiUrl}/${userId}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData);
  }
  getUserRole(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/role`;
    return this.http.get<any>(url);
  }
}
