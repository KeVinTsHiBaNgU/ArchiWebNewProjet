import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private apiUrl = 'http://localhost:3000/api/competence'; 

  constructor(private http: HttpClient) { }

  // ...

  getCompetenceById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url,{headers});
  }
  
  getAllCompetences(): Observable<any[]> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/`,{headers});
  }

  deleteCompetence(competenceId: string) {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/delete/${competenceId}`;
    return this.http.delete(url, {headers});
  }

  createCompetence(competence: any): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/new`, competence, {headers});
  }
}
