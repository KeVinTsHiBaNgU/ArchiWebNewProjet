import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private apiUrl = 'http://localhost:3000/api/competence'; 

  constructor(private http: HttpClient) { }

  // ...

  getCompetenceById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  
  getAllCompetences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  createCompetence(competence: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, competence);
  }
}
