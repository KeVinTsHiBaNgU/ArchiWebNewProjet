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
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ headers });
  }

  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/all/users`);
  }

  getEtudiants(): Observable<any[]> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl + '/etudiants', { headers });
  }
  
  getUser(userId: string): Observable<User[]> {
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<User[]>(`${this.apiUrl}/${userId}`, { headers });
  }
  
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   return this.http.get<any>(`${this.apiUrl}/current`, { headers });
  }

  updateUserProfile(name: string, email: string, password: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { name, email, password };
  
    return this.http.put<any>(`${this.apiUrl}/profile`, body, { headers });
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

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers });
  }
}
