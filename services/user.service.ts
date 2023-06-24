import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
     // Inclure le token dans l'en-tête de la requête
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ headers });
  }
  getUser(userId: string): Observable<User[]> {
    // Effectuez une requête HTTP GET pour récupérer les utilisateurs depuis votre backend
    // Assurez-vous d'ajuster l'URL en fonction de votre API
     // Inclure le token dans l'en-tête de la requête
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<User[]>(`${this.apiUrl}/${userId}`, { headers });
  }
  
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   return this.http.get<any>(`${this.apiUrl}/current`, { headers });
  }

  createUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, userData,  { headers });
  }
  getUserRole(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${userId}/role`;
    return this.http.get<any>(url, { headers });
  }
}
